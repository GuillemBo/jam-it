import { Component, OnInit } from '@angular/core';
import { MusicianViewComponent } from '../musician-view.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateGroupService } from '../../../shared/services/create-group.service';
import { GroupService } from '../../../shared/services/group.service';
import { ToastrService } from 'ngx-toastr';
import { RoutesEnum } from '../../../shared/models/routes.enum';

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [MusicianViewComponent, ReactiveFormsModule],
  templateUrl: './create-group-form.component.html',
  styleUrl: './create-group-form.component.scss'
})
export class CreateGroupFormComponent implements OnInit {

  registerGroupForm: FormGroup = this.fb.group({});
  errorMessage: string;
  userId: number = null;
  isEditMode: boolean = false;
  groupId: number
  
  constructor (private authService: AuthService,
    private _route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _createGroupService: CreateGroupService,
    private _groupService: GroupService
  ) {


    this._route.paramMap.subscribe(params => {
      const groupId = params.get('id');
      if (groupId) {
        this.groupId = +groupId;
        this.isEditMode = true;
        this.loadGroupData(this.groupId);
      }
    });


    this.registerGroupForm = this.fb.group({
      id_user: new FormControl ('', Validators.required),
      name: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      musicians: new FormControl ('', [Validators.required]),
      description: new FormControl ('', []),
      genre: new FormControl ('', [])
    })
  }



  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.registerGroupForm.patchValue({ id_user: this.userId });
  }

  private loadGroupData(id: number) {
    this._groupService.getGroupById$(id).subscribe(group => {
      this.registerGroupForm.patchValue(group);
    });
  }


  onSubmit(): void {
    if (this.registerGroupForm.valid) {
      const formData = this.registerGroupForm.value;

      if (this.isEditMode) {
        // Modo Edición
        this._createGroupService.updateGroup(this.groupId, formData).subscribe({
          next: (response) => {
            this.toastr.success('Group updated successfully');
            this.router.navigate([RoutesEnum.GROUP]);
          },
          error: (error) => {
            this.errorMessage = error.error.message;
            this.toastr.warning('Error updating group');
          }
        });

      } else {

      this._createGroupService.createGroup(formData).subscribe({
        next: (response) => {
          console.log('Grupo creado', response);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el grupo', error);
          this.errorMessage = error.error.message
        }
    });
  }
    } else {
      console.log('Formulario inválido');
    }
  }
}
