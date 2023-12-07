import { Component, OnInit } from '@angular/core';
import { heliversedata } from '../data/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor () {}

  jsonData: any = heliversedata;
  heliverseData: any = [];
  domainData: any = [];
  genderData: any = [];
  displayData: any = [];

  selectedUserData: any = [];

  p: any;

  availablityData: any = [
    {item_id: 1, item_name: 'true', checked: true},
    {item_id: 2, item_name: 'false', checked: true}
  ];

  selctedtedDomain: any = [];
  selectedGender: any = [];

  selectAllDomain: boolean = true;
  selectAllGender: boolean = true;
  selectAllAvailaiblity: boolean = true;
  showUserList: boolean = false;

  ngOnInit(): void {
    const data = this.jsonData;
    this.heliverseData = data;
    this.extractDomainAndGender(this.heliverseData);
  }


  extractDomainAndGender(arr: any): void {

    if(arr){
      const uniqueDomain = new Set<string>();
      const uniqueGender = new Set<string>();

      arr.forEach((user:any) => {
        uniqueDomain.add(user.domain);
        uniqueGender.add(user.gender); 
      });

      const mapToItem = (set: Set<string>): any => {
        return Array.from(set).map((item, index) => ({
          item_id: index + 1,
          item_name: item,
          checked: true,
        }));
      };

      this.domainData = mapToItem(uniqueDomain);
      this.genderData = mapToItem(uniqueGender);
    }

  }

  selectAll(filtertype: string) {
if(filtertype === 'domain'){
  this.domainData.forEach((domain: any) => (domain.checked = this.selectAllDomain));
  // this.getCheckedItemList('domain');
  // console.log(this.domainData);
} else if(filtertype === 'gender'){
  this.genderData.forEach((gender: any) => (gender.checked = this.selectAllGender));
  // console.log(this.genderData);
} else {
  this.availablityData.forEach((item: any) => (item.checked = this.selectAllAvailaiblity));
  // console.log(this.availablityData);
}
  }

  selectItem(type: string) {
    if (type === 'domain') {
      this.selectAllDomain = this.checkSelected(type);
  //     // this.getCheckedItemList(type);
  // console.log(this.domainData);

    } else if(type === 'gender') {
      this.selectAllGender = this.checkSelected(type);
  // console.log(this.genderData);

      // this.getCheckedItemList(type);
    } else {
      this.selectAllAvailaiblity = this.checkSelected(type);
      // this.getCheckedItemList(type);
  // console.log(this.availablityData);

    }
  }

  checkSelected(type: string): boolean {
    // const items = type === 'domain' ? this.domainData : this.genderData;
    let items: any = [];
    if(type === 'domain'){
       items = this.domainData
    } else if(type === 'gender'){
      items = this.genderData;
    } else {
      items = this.availablityData;
    }
    return items.every((item: any) => item.checked);
  }
  modifySearch(): void {
    // Arrays to store selected items
    let extractedDomain: Set<string> = new Set<string>();
    let extractedGender: Set<string> = new Set<string>();
    let extractedAvailability: Set<boolean> = new Set<boolean>();
  
    // Filtering selected items from domainData array
    this.domainData.filter((item: any) => {
      if (item.checked) {
        extractedDomain.add(item.item_name);
      }
    });
  
    // Filtering selected items from genderData array
    this.genderData.filter((item: any) => {
      if (item.checked) {
        extractedGender.add(item.item_name);
      }
    });
  
    // Filtering selected items from availabilityData array
    this.availablityData.filter((item: any) => {
      if (item.checked) {
        extractedAvailability.add(item.item_name === 'true');
      }
    });
  
    // Logging the extracted data to the console
    console.log('Data', extractedDomain, extractedGender, extractedAvailability);
  
    // Assuming jsonData is an array of objects
    let data = this.jsonData;
  
    // Find the intersection of all three sets
    const intersection = data.filter((item: any) =>
      extractedDomain.has(item.domain) &&
      extractedGender.has(item.gender) &&
      extractedAvailability.has(item.available)
    );
  
    // You can update a display array or perform additional processing with the filtered data
    // For example, assuming you have a display array named 'displayData'
    this.displayData = intersection;
  
    // Log the filtered data to the console
    console.log('Filtered Data:', intersection);

    this.heliverseData = intersection;
  }

  addUser(userData: any){
    const existingUserIndex = this.selectedUserData.findIndex((user:any) => user.id === userData.id);

    let extractedDomain: Set<boolean> = new Set<boolean>();
    if(this.selectedUserData.length > 0){
      this.selectedUserData.filter((item: any) => {
          extractedDomain.add(item.domain);
      });
    }
    if(existingUserIndex === -1){
      if(userData.available){
      if(extractedDomain.size === 0){
        this.selectedUserData.push(userData);
      } else {
        if(extractedDomain.has(userData.domain)){
          alert('Same Domain User Already Exist');
        } else {
          this.selectedUserData.push(userData);
        }
      }
    } else {
      alert('User is Unavailable');
    }
    } else {
      alert('User Already exist')
    }

    console.log(this.selectedUserData);
  }
  

}
