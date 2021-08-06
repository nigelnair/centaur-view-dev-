import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
// import { SmartTable,SortDirection } from 'smart-table-ng';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_model/user.model';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginService]

})
export class DashboardComponent implements OnInit {
  clientData = []; 
  // clientData: any;
  position = 'before';
  clientMemTrans = [];   
  clientPayments = [];  
  clientInvoices = [];    
  displayedCollection = [];
  password: string = "";
  username: string = "";
  c_id: string = "";
  bill_total = 0;
  bill_gst_total = 0;

settings = {
  // title:'hi',
  columns: {
    // receipt_id: {
    //   title: 'Receipt ID',
    //   editable: false
    //   // class: 'payments'
    // },
    // invoice_id: {
    //   title: 'Invoice ID'
    // },
    // pmt_ref: {
    //   title: 'Ref #'
    // },
    // notes: {
    //   title: 'notes',
    //   filter:false
    // },
    receipt_date: {
      title: 'Date',
      sort: true,
      // type'date',
      sortDirection:'desc',
      filter:false,
      // valuePrepareFunction: (date) => {
      // if (date) {
      // // return new DatePipe('he-IL' or 'en-GB' ['any lang code you want]).transform(date, 'dd/MM/yyyy hh:mm');
      // }

    },
    // pmt_type: {
    //   title: 'source',
    //   filter:false

    // },
    amount: {
      title: 'Amount',
      filter:false

    }
  },
  attr: {
        class: 'table table-hover table-sm nowrap payments'
      },
  defaultStyle: false,
  noDataMessage: 'No match Found',
  // hideSubHeader:true,
  actions: {
              edit:false,
              delete:false,
              add:false
          },
  pager: {
      display:true,
      perPage: 5,
      position: 'center'
  },
};
invoiceSettings = {
  // title:'hi',
  columns: {
    invoice_id: {
      title: 'ID',
      editable: false
      // class: 'payments'
    },
    inv_date: {
      title: 'Date',
      sort: true,
      sortDirection:'desc',
      filter:false

    },
    inv_due_date: {
      title: 'Due Date',
      filter:false


    },
    billing_period: {
      title: 'Billing Cycle',
      filter:false

    },
    inv_total: {
      title: 'Total',
      filter:false

    },
   // inv_balance: {
   //    title: 'Balance Due',
   //    filter:false
      
   //  },
    inv_balance: {
      title: 'Balance Due',
      type:'html',
      filter:false,
      valuePrepareFunction: (inv_balance) => {
      // return value===true ? 'Complete' : 'Pending';
      if(inv_balance == 0){
        return  inv_balance+'<div class="text-nowrap text-success"><i class="fa fa-check-circle"></i> PAID</div>'; //  Complete';
        //return  'Complete';
      } else {
        //return  'Pending';
        return   inv_balance+'<div class="text-nowrap text-warning"><i class="fa fa-exclamation-circle"></i> Pending</div>'; //  Pending';
      }
    }

      
    },
    
    // Status: {
    //   title: 'Status'
    // }
  },
  attr: {
        class: 'table table-dark table-hover table-striped table-sm nowrap payments'
      },
  defaultStyle: false,
  noDataMessage: 'No match Found',
  // hideSubHeader:true,
  actions: {
              edit:false,
              delete:false,
              view:true,
              add:false
//               position:'right',
//               columnTitle:'Status',
//               rowClassFunction: (row) => {
// if (row.clientInvoices.inv_balance === 0) {
// return 'custom:[{title:'status'}],';
// } else if (row.clientInvoices.inv_balance > 0) {
// return 'score positive';
// }
// return '';
// }

            },
  pager: {
      display:true,
      perPage: 5,
      position: 'center'
  },

};

  constructor(
  	public router: Router, 
    public _loginService: LoginService,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService,
  	) { }

    ngOnInit() {
  	    this._loginService.getUserData().subscribe((data: any)=>{  
          var self=this;
          this.clientData = data.data;
          this.clientMemTrans = data.memorized_trans;
          this.clientPayments = data.payments;
          this.clientInvoices = data.invoices;


          for (var i = this.clientMemTrans.length - 1; i >= 0; i--) {
            this.bill_total += parseFloat(this.clientMemTrans[i].price);
            this.bill_gst_total += (parseFloat(this.clientMemTrans[i].price) * 0.125)+parseFloat(this.clientMemTrans[i].price);  
          }
          if (this.clientData == null) {
            localStorage.removeItem('clientID');
            localStorage.removeItem('secret_key');
            this.router.navigate(['logout']);
          }
        });
        this._loginService.checkAuth().subscribe(
            response => this.handleResponses(response),
            error => this.handleResponses(error)
            );  
    }
    changePassword(c_id){
        // console.log(c_id);
        let user = new User('','');
        user.username = c_id;
        user.password = this.password;
        let data = [{'username':user.username,'password': user.password }
        ];
        this._loginService.sendPassword({ data })
        .subscribe(
          response => this.handlePResponse(response),
          error => this.handlePResponse(error)
          );
      }
    logout(){
	      localStorage.removeItem('clientID');
        localStorage.removeItem('secret_key');
        this.router.navigate(['logout']);
    }
    handlePResponse(response) { 
    
        if(response.success){
              // console.log("success");
              alert('Password Changed');
              this.ngxSmartModalService.getModal('myModal').close()
              this.toastr.success('Password Saved', 'Success!',);
              this.password = "";

              // localStorage.setItem('clientID',response.clientID);
              // localStorage.setItem('secret_key',response.secret_key);
        } else if (response.error){
              // this.toastr.success('Welcome '+this.username+'.', 'Success!',);
              this.toastr.error('Passord could not be saved.', 'Error!');
              this.password = "";
              
        } else {

        }
    
  }
    handleResponses(response) { 
        if(response.success){
              console.log("authenticated");
        } else if (response.error){
              console.log("error");
              localStorage.removeItem('clientID');
              localStorage.removeItem('secret_key');
              this.router.navigate(['logout']);
        } else {
              localStorage.removeItem('clientID');
              localStorage.removeItem('secret_key');
              this.router.navigate(['logout']);
        }
    }

}
