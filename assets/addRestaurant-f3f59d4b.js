import{c as m,a as e,R as b,j as n,d as y,g as i}from"./index-d0c971e1.js";import{b as A}from"./white_back_arrow-1296b56c.js";m.createRoot(document.getElementById("root")).render(e(b.StrictMode,{children:e(I,{})}));function I(){async function a(t){const l=document.getElementById("name").value,r=document.getElementById("description").value,d=document.getElementById("address").value,c=document.getElementById("city").value,h=document.getElementById("state").value,u=document.getElementById("website").value,s=document.getElementById("category").value,p=document.getElementById("price").value,v=document.getElementById("photo").value;await y(l,r,d,c,h,u,s,p,v),window.location.href=i()+"viewRestaurant/?restaurant="+restaurant.id}function o(t){window.location.href=i()}return n("div",{className:"AddRestaurant",children:[e("img",{src:A,alt:"back arrow",className:"back",onClick:o}),e("h1",{children:"Add Restaurant"}),n("div",{className:"Fields",children:[e("label",{htmlFor:"name",children:"Restaurant Name: "}),e("input",{type:"text",id:"name"}),e("br",{}),e("label",{htmlFor:"description",children:"Restaurant Description: "}),e("textarea",{name:"description",id:"description",cols:"30",rows:"5"}),e("br",{}),e("label",{htmlFor:"address",children:"Address: "}),e("input",{type:"text",id:"address"}),e("br",{}),e("label",{htmlFor:"city",children:"City: "}),e("input",{type:"text",id:"city"}),e("label",{htmlFor:"state",children:"State: "}),n("select",{id:"state",children:[e("option",{value:"AL",children:"Alabama"}),e("option",{value:"AK",children:"Alaska"}),e("option",{value:"AZ",children:"Arizona"}),e("option",{value:"AR",children:"Arkansas"}),e("option",{value:"CA",children:"California"}),e("option",{value:"CO",children:"Colorado"}),e("option",{value:"CT",children:"Connecticut"}),e("option",{value:"DE",children:"Delaware"}),e("option",{value:"DC",children:"District Of Columbia"}),e("option",{value:"FL",children:"Florida"}),e("option",{value:"GA",children:"Georgia"}),e("option",{value:"HI",children:"Hawaii"}),e("option",{value:"ID",children:"Idaho"}),e("option",{value:"IL",children:"Illinois"}),e("option",{value:"IN",children:"Indiana"}),e("option",{value:"IA",children:"Iowa"}),e("option",{value:"KS",children:"Kansas"}),e("option",{value:"KY",children:"Kentucky"}),e("option",{value:"LA",children:"Louisiana"}),e("option",{value:"ME",children:"Maine"}),e("option",{value:"MD",children:"Maryland"}),e("option",{value:"MA",children:"Massachusetts"}),e("option",{value:"MI",children:"Michigan"}),e("option",{value:"MN",children:"Minnesota"}),e("option",{value:"MS",children:"Mississippi"}),e("option",{value:"MO",children:"Missouri"}),e("option",{value:"MT",children:"Montana"}),e("option",{value:"NE",children:"Nebraska"}),e("option",{value:"NV",children:"Nevada"}),e("option",{value:"NH",children:"New Hampshire"}),e("option",{value:"NJ",children:"New Jersey"}),e("option",{value:"NM",children:"New Mexico"}),e("option",{value:"NY",children:"New York"}),e("option",{value:"NC",children:"North Carolina"}),e("option",{value:"ND",children:"North Dakota"}),e("option",{value:"OH",children:"Ohio"}),e("option",{value:"OK",children:"Oklahoma"}),e("option",{value:"OR",children:"Oregon"}),e("option",{value:"PA",children:"Pennsylvania"}),e("option",{value:"RI",children:"Rhode Island"}),e("option",{value:"SC",children:"South Carolina"}),e("option",{value:"SD",children:"South Dakota"}),e("option",{value:"TN",children:"Tennessee"}),e("option",{value:"TX",children:"Texas"}),e("option",{value:"UT",children:"Utah"}),e("option",{value:"VT",children:"Vermont"}),e("option",{value:"VA",children:"Virginia"}),e("option",{value:"WA",children:"Washington"}),e("option",{value:"WV",children:"West Virginia"}),e("option",{value:"WI",children:"Wisconsin"}),e("option",{value:"WY",children:"Wyoming"})]}),e("br",{}),e("label",{htmlFor:"category",children:"Restaraunt Category:"}),n("select",{id:"category",children:[e("option",{value:"American",children:"American"}),e("option",{value:"Asian",children:"Asian"}),e("option",{value:"Barbecue",children:"Barbecue"}),e("option",{value:"Bakery",children:"Bakery"}),e("option",{value:"Breakfast",children:"Breakfast"}),e("option",{value:"Cafe",children:"Cafe"}),e("option",{value:"Chinese",children:"Chinese"}),e("option",{value:"Fast Food",children:"Fast Food"}),e("option",{value:"French",children:"French"}),e("option",{value:"Greek",children:"Greek"}),e("option",{value:"Indian",children:"Indian"}),e("option",{value:"Italian",children:"Italian"}),e("option",{value:"Japanese",children:"Japanese"}),e("option",{value:"Mexican",children:"Mexican"}),e("option",{value:"Pizza",children:"Pizza"}),e("option",{value:"Seafood",children:"Seafood"}),e("option",{value:"Southern",children:"Southern"}),e("option",{value:"Spanish",children:"Spanish"}),e("option",{value:"Thai",children:"Thai"}),e("option",{value:"Vietnamese",children:"Vietnamese"})]}),e("br",{}),e("label",{htmlFor:"price",children:"Price:"}),n("select",{id:"price",children:[e("option",{value:"1",children:"$"}),e("option",{value:"2",children:"$$"}),e("option",{value:"3",children:"$$$"}),e("option",{value:"4",children:"$$$$"})]}),e("br",{}),e("label",{htmlFor:"website",children:"Website: "}),e("input",{type:"text",id:"website"}),e("br",{}),e("label",{htmlFor:"photo",children:"Restaurant Photo URL: "}),e("input",{type:"text",id:"photo"}),e("br",{}),e("br",{}),e("button",{id:"addRestaraunt",onClick:a,children:"Add Restaraunt"})]})]})}
