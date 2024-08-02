import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {


  make!: String
  model!: String
  description!: String
  image1!: String
  image2!: String
  image3!: String
  image4!: String
  image5!: String
  image6!: String
  color!: String
  transmission!: String
  drive!: String
  year!: number
  vin!: number
  price!: number
  fuel!: String;
  milage!: String;
 body!: String;

 constructor(private productService: ProductsService, private router: Router) { }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
 }

  submitCar(): void {
    const carData = {
      // Define your bountyData object here
      make: this.make,
      model: this.model,
      description: this.description,
      price: this.price,
      year: this.year,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4,
      image5: this.image5,
      image6: this.image6,
      body: this.body,
      fuel: this.fuel,
      vin: this.vin,
      milage: this.milage,
      drive: this.drive,
      color: this.color,
      transmission: this.transmission,
    };

    
    this.productService.postProduct(carData).subscribe(
      response => {
        Swal.fire({
          title: "Good job!",
          text: 'Car posted successfully!',
          icon: "success",
          customClass: {
            confirmButton: 'custom-ok-button'
          }
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
      error => {
        // this.dialog.open(ModalComponent, {
        //   data: { message: 'Please fill in the correct information.' }
        // });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      }
    );
  }

}
