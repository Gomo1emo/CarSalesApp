import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { Image } from 'src/app/Interface/image';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  carForm!: FormGroup;
  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];
  imageUrl1: string | null = null;
  imageUrl2: string | null = null;
  imageUrl3: string | null = null;
  imageUrl4: string | null = null;
  imageUrl5: string | null = null;
  imageUrl6: string | null = null;

  carId: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  image6: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    //this.fetchImages();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      color: ['', Validators.required],
      vin: [
        '',
        [Validators.required, Validators.pattern('^[A-HJ-NPR-Z0-9]{17}$')],
      ],
      description: ['', Validators.required],
      milage: ['', Validators.required],
      body: ['', Validators.required],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      drive: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      image5: [''],
      image6: [''],
    });

    
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const formData = new FormData();
      formData.append('make', this.carForm.get('make')?.value);
      formData.append('model', this.carForm.get('model')?.value);
      formData.append('year', this.carForm.get('year')?.value);
      formData.append('color', this.carForm.get('color')?.value);
      formData.append('vin', this.carForm.get('vin')?.value);
      formData.append('description', this.carForm.get('description')?.value);
      formData.append('milage', this.carForm.get('milage')?.value);
      formData.append('body', this.carForm.get('body')?.value);
      formData.append('transmission', this.carForm.get('transmission')?.value);
      formData.append('fuel', this.carForm.get('fuel')?.value);
      formData.append('drive', this.carForm.get('drive')?.value);
      formData.append('price', this.carForm.get('price')?.value);
  
      if (this.image1) formData.append('image1', this.image1);
      if (this.image2) formData.append('image2', this.image2);
      if (this.image3) formData.append('image3', this.image3);
      if (this.image4) formData.append('image4', this.image4);
      if (this.image5) formData.append('image5', this.image5);
      if (this.image6) formData.append('image6', this.image6);
  
      this.onUpload();
      this.productService.postProduct(formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Good job!',
            text: 'Car posted successfully!',
            icon: 'success',
            customClass: {
              confirmButton: 'custom-ok-button',
            },
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            customClass: {
              confirmButton: 'custom-ok-button',
            },
          });
        }
      );
    }
  }
  
  submitCar(): void {
    const carData = this.carForm.value;

    this.productService.postProduct(carData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Good job!',
          text: 'Car posted successfully!',
          icon: 'success',
          customClass: {
            confirmButton: 'custom-ok-button',
          },
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);

        // this.dialog.open(ModalComponent, {
        //   data: { message: 'Bounty posted successfully!!!' }
        // }).afterClosed().subscribe(() => {
        //   localStorage.removeItem('bountyDraft');  // Clear draft after submission
        // });
      },
      (error) => {
        // this.dialog.open(ModalComponent, {
        //   data: { message: 'Please fill in the correct information.' }
        // });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          customClass: {
            confirmButton: 'custom-ok-button',
          },
        });
      }
    );
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      switch (index) {
        case 1:
          this.image1 = file;
          break;
        case 2:
          this.image2 = file;
          break;
        case 3:
          this.image3 = file;
          break;
        case 4:
          this.image4 = file;
          break;
        case 5:
          this.image5 = file;
          break;
        case 6:
          this.image6 = file;
          break;
        default:
          break;
      }
  
      const fr = new FileReader();
      fr.onload = (e: any) => {
        switch (index) {
          case 1:
            this.imageUrl1 = e.target.result;
            break;
          case 2:
            this.imageUrl2 = e.target.result;
            break;
          case 3:
            this.imageUrl3 = e.target.result;
            break;
          case 4:
            this.imageUrl4 = e.target.result;
            break;
          case 5:
            this.imageUrl5 = e.target.result;
            break;
          case 6:
            this.imageUrl6 = e.target.result;
            break;
          default:
            break;
        }
      };
      fr.readAsDataURL(file);
    }
  }
  
  

  onUpload(): void {
    if (this.image) {
      this.imageService.upload(this.image).subscribe(
        (data) => {
          this.fetchImages();
        },
        (err) => {
          this.reset();
          this.fetchImages();
        }
      );
    }
  }

  reset(): void {
    this.image = null;
    this.imageMin = null;
    const imageInputFile = document.getElementById('image') as HTMLInputElement;
    if (imageInputFile) {
      imageInputFile.value = '';
    }
  }

  fetchImages(): void {
    this.imageService.list().subscribe(
      (images) => {
        this.images = images;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  deleteImage(id: any): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this image?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.delete(id).subscribe(
          () => {
            this.fetchImages();
            Swal.fire('Image deleted !');
          },
          (error) => {
            console.error('Error deleting image:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Operation canceled', '', 'error');
      }
    });
  }
}
