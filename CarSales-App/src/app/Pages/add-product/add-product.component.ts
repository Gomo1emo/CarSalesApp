import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { Image } from 'src/app/Interface/image';
import  { ImageService } from 'src/app/services/image/image.service';

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
  imageUrl: string | null = null;

  
  

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.fetchImages();
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
      if (this.image) {
        this.imageService.upload(this.image).subscribe(
          (uploadResponse) => {
            const imageUrl = uploadResponse.url;
            this.carForm.patchValue({ image1: imageUrl });
            this.carForm.patchValue({ image2: imageUrl });
            this.carForm.patchValue({ image3: imageUrl });
            this.carForm.patchValue({ image4: imageUrl });
            this.carForm.patchValue({ image5: imageUrl });
            this.carForm.patchValue({ image6: imageUrl });
           
            this.submitCar();
          },
          (err) => {
            this.reset();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred while uploading the image!',
              customClass: {
                confirmButton: 'custom-ok-button',
              },
            });
          },
        );
      } else {
        this.submitCar();
      }
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

  onFileChange(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageUrl = evento.target.result; // Bind image preview URL to imageUrl
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
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
