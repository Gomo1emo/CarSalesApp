import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { Image } from 'src/app/Interface/image';
import { ImageService } from 'src/app/services/image/image.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  carForm!: FormGroup;
  images: File[] = []; // Changed to File[]
  imageUrls: (string | null)[] = Array(6).fill(null); // Allow null values

  image1: File | null = null;
  image2: File | null = null;
  image3: File | null = null;
  image4: File | null = null;
  image5: File | null = null;
  image6: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      vin: ['', Validators.required],
      description: ['', Validators.required],
      millage: ['', Validators.required],
      body: ['', Validators.required],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      drive: ['', Validators.required],
      tankSize: ['', Validators.required],
      price: ['', Validators.required],
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
      this.submitCar();
    }
  }

  submitCar(): void {
    if (this.carForm.valid) {
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
  }

  onFileChange(event: any) {
    this.images = Array.from(event.target.files); // Store selected files as an array of File objects
    this.imageUrls.fill(null); // Reset all URLs

    // Use FileReader to read each file
    this.images.forEach((image, index) => {
      const fr = new FileReader();
      fr.onload = (evento: any) => {
        if (index < 6) {
          this.imageUrls[index] = evento.target.result; // Store URL in array
          this.carForm.patchValue({ [`image${index + 1}`]: this.imageUrls[index] }); // Bind image URL to form control (corrected the index)
        }
      };
      fr.readAsDataURL(image);
    });

    this.onUpload(); // Trigger upload after selecting files
}


  onUpload(): void {
    if (this.images.length > 0) {
      const uploadRequests = this.images.map(image => this.imageService.upload(image));
      
      forkJoin(uploadRequests).subscribe(
        (responses) => {
          responses.forEach((res, index) => {
            this.carForm.patchValue({ [`image${1}`]: res.url }); // Bind the returned URLs to the form
            this.carForm.patchValue({ [`image${2}`]: res.url }); // Bind the returned URLs to the form
            this.carForm.patchValue({ [`image${3}`]: res.url }); // Bind the returned URLs to the form
            this.carForm.patchValue({ [`image${4}`]: res.url }); // Bind the returned URLs to the form
            this.carForm.patchValue({ [`image${5}`]: res.url }); // Bind the returned URLs to the form
            this.carForm.patchValue({ [`image${6}`]: res.url }); // Bind the returned URLs to the form
          });
          Swal.fire({
            title: "Images uploaded!",
            text: "You can now submit the form.",
            icon: "success",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
        },
        (err) => {
          console.error('Upload error:', err);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "An error occurred while uploading images.",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
        }
      );
    } else {
      console.warn('No images to upload.');
    }
  }

  reset(): void {
    this.images = [];
    this.imageUrls.fill(null);
    this.carForm.reset(); // Optionally reset the form
  }

  fetchImages(): void {
    this.imageService.list().subscribe(
      (images: Image[]) => {
        // Process images as needed
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
            Swal.fire('Image deleted!');
          },
          (error) => {
            console.error('Error deleting image:', error);
          }
        );
      } else {
        Swal.fire('Operation canceled', '', 'error');
      }
    });
  }
}
