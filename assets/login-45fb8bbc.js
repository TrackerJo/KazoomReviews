import{c,a as n,R as r,r as s,j as t}from"./index-5ef40ff5.js";import{S as l}from"./signUp-88de29ba.js";import{S as a}from"./signIn-d28bb67a.js";c.createRoot(document.getElementById("root")).render(n(r.StrictMode,{children:n(d,{})}));function d(){const[e,i]=s.exports.useState("None");function o(){window.location.href="/friends-and-family-reviews/"}return t("div",{className:"Login b1",children:[n("h1",{children:"Friends&Family Reviews"}),e=="None"?t("div",{className:"Selections",children:[n("button",{onClick:()=>{i("Sign In")},children:"Sign In"}),n("button",{onClick:()=>{i("Sign Up")},children:"Sign Up"})]}):e=="Sign In"?n(a,{onLogin:o}):n(l,{onLogin:o})]})}
