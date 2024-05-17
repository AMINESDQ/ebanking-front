import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit   {
handleUpdateCustomer() {
  this.cs.updateCustomer(this.customerId,this.editCustomerForm.value).subscribe(
    {
      next: (produit) => {
        this.router.navigateByUrl('/customers');
       }
    }
  )
}
  
  constructor(private cs:CustomersService,private fb:FormBuilder,private activatedroute:ActivatedRoute,private router:Router){}
   public editCustomerForm!:FormGroup;
   customerId=this.activatedroute.snapshot.params['id'];
  ngOnInit(): void {
    this.cs.getCustomerById(this.customerId).subscribe(
      (customer) => {
        
        this.editCustomerForm = this.fb.group({
          name : this.fb.control(customer.name, [Validators.required, Validators.minLength(4)]),
          email : this.fb.control(customer.email,[Validators.required, Validators.email])
        });
      }
    );
    
  }

}
