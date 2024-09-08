import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() carUpdated = new EventEmitter<void>();
  carForm!: FormGroup;
  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];
  imageUrl1: string | null = null;

  carId: any;
 

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // this.fetchImages();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      vin: [
        '',
  Validators.required
      ],
      description: ['', Validators.required],
      millage: ['', Validators.required],
      body: ['', Validators.required],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      drive: ['', Validators.required],
      tankSize: ['', Validators.required],
      price: [
        '',
        Validators.required
      ],
      image: ['']
     
    });

    // this.productService.getProduct().subscribe(
    //   data => {
    //       this.carId = data.id;
    //       this.carForm.patchValue(data);
    //       // Load the image if needed
    // if (data.image) {  // Update to profilePicture
    //   this.imageUrl1 = data.image; // Directly set imageUrl
    // }
    //   }
    // );
    
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      if (this.image) {
        this.imageService.upload(this.image).subscribe(
          (uploadResponse) => {
            const imageUrl1 = uploadResponse.url;
            this.carForm.patchValue({ image: imageUrl1 });  // Bind image URL to profilePicture
            this.submitCar();
          },
          (err) => {
            this.reset();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred while uploading the image!",
              customClass: {
                confirmButton: 'custom-ok-button'
              }
            });
          }
        );
      } else {
        this.submitCar();
      }
    }
  }
  
  submitCar(): void {
    
      this.productService.postProduct(this.carForm.value).subscribe(
        () => {
          Swal.fire({
            title: "Success!",
            text: "Car posted successfully!",
            icon: "success",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
          // this.carUpdated.emit();
          this.router.navigate(['/']);
        },
        error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while posting the car!",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
        }
      );
  }


  onFileChange(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageUrl1 = evento.target.result; // Bind image preview URL to imageUrl
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }
  
  

  onUpload(): void {
    if (this.image) {
    this.imageService.upload(this.image).subscribe(
    data => {
    this.fetchImages();
    },
    err => {
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
