let leads = JSON.parse(localStorage.getItem("leads")) || [];

displayLeads();

function addLead() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let source = document.getElementById("source").value;
    let status = document.getElementById("status").value;
    let notes = document.getElementById("notes").value;

    if (name === "" || email === "") {
        alert("Please fill Name and Email");
        return;
    }

    let lead = {
        name,
        email,
        source,
        status,
        notes
    };

    leads.push(lead);

    localStorage.setItem("leads", JSON.stringify(leads));

    displayLeads();

    clearForm();

    alert("Lead Added Successfully!");
}

function displayLeads() {

    let table = document.getElementById("leadTable");

    table.innerHTML = "";
    let total = leads.length;
let newCount = 0;
let contactedCount = 0;
let convertedCount = 0;
let displayedLeads = 0;   

let search =
document.getElementById("search").value.toLowerCase();

let filter =
document.getElementById("filter").value;
    leads.forEach((lead,index)=>{

       
if(
!lead.name.toLowerCase().includes(search) &&
!lead.email.toLowerCase().includes(search)
){
return;
}

if(filter!="All" && lead.status!=filter){
return;
}
displayedLeads++;
if(lead.status=="New") newCount++;
if(lead.status=="Contacted") contactedCount++;
if(lead.status=="Converted") convertedCount++;

table.innerHTML+=`
<tr>

<td>${lead.name}</td>

<td>${lead.email}</td>

<td>${lead.source}</td>

<td>

<span class="status ${lead.status.toLowerCase()}">

${lead.status}

</span>

</td>

<td>${lead.notes}</td>

<td>

<button class="edit-btn" onclick="editLead(${index})">
✏️ Edit
</button>

<button class="delete-btn" onclick="deleteLead(${index})">
🗑 Delete
</button>

</td>
</tr>
`;

}
);
if(displayedLeads === 0){
    table.innerHTML = `
    <tr>
        <td colspan="6" style="text-align:center;padding:20px;">
            📭 No Leads Found
        </td>
    </tr>
    `;
}
document.getElementById("totalLeads").innerText = total;

document.getElementById("newLeads").innerText = newCount;

document.getElementById("contactedLeads").innerText = contactedCount;

document.getElementById("convertedLeads").innerText = convertedCount;

}

function deleteLead(index) {

    if(confirm("Delete this lead?")){

        leads.splice(index,1);

        localStorage.setItem("leads", JSON.stringify(leads));

        displayLeads();
    }

}

function editLead(index){

    document.getElementById("name").value = leads[index].name;
    document.getElementById("email").value = leads[index].email;
    document.getElementById("source").value = leads[index].source;
    document.getElementById("status").value = leads[index].status;
    document.getElementById("notes").value = leads[index].notes;

    leads.splice(index,1);

    localStorage.setItem("leads", JSON.stringify(leads));

    displayLeads();

}

function clearForm(){

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("source").value="";
    document.getElementById("status").value="New";
    document.getElementById("notes").value="";

}
function showToast(){

    let toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);

}