<template>
  <!--container-->
  <div class="container">
    <!-- Event,Report and Total Attendance page grid-->
    <div class="grid">
      <!-- Event and Report page-->
      <div class="grid1">
        <h1>Event and Report</h1>
      </div>
      <!-- Total Attendance page grid-->
      <div class="grid2">
        <h4 class="header4">Total Attendance: 2666</h4>
        <h4 class="header41">Total Offering: $2666</h4>
      </div>
      <!--  Preacher and Event name page grid-->
      <div class="gridA">
        <!-- Event name page grid-->
        <div class="grid3">
          <p class="grid3para">Event Name</p>
          <h1>Grace and Power Convention</h1>
          <p class="grid3para2">20th October, 2020</p>
        </div>
        <!-- Preacher page grid-->
        <div class="grid4">
          <div class="flex1">
            <div class="flex2">preacher:</div>
            <div class="flex3">Pastor OO Aina</div>
          </div>
          <div class="flex1">
            <div class="flex2">First Timers:</div>
            <div class="flex3">12</div>
          </div>
          <div class="flex1">
            <div class="flex2">Topic:</div>
            <div class="flex3">Faith</div>
          </div>
          <div class="flex1">
            <div class="flex2">New Convert:</div>
            <div class="flex3">233</div>
          </div>
        </div>
        <!-- Preacher page grid end-->
      </div>
    </div>
    <!-- Attendance page-->
    <div>
      <h1 class="attend">Attendance</h1>
    </div>
    <div class="gridB">
      <div class="grid5">
        <h3>Attendance Item</h3>
      </div>
      <div class="6">
        <h3>Count</h3>
      </div>
      <div class="7">
        <h3>Total</h3>
      </div>
    </div>
    <hr />
    <div class="gridC">
      <div class="grid5">
        <h3>male</h3>
      </div>
      <div class="6">
        <h3>123</h3>
      </div>
      <div class="7">
        <h3>123</h3>
      </div>
    </div>
    <hr class="line1" />
    <div class="gridC">
      <div class="grid5">
        <h3>Female</h3>
      </div>
      <div class="6">
        <h3>344</h3>
      </div>
      <div class="7">
        <h3>344</h3>
      </div>
    </div>
    <hr class="line1" />
    <div class="gridC">
      <div class="grid5">
        <h3>Children</h3>
      </div>
      <div class="6">
        <h3>1222</h3>
      </div>
      <div class="7">
        <h3>1222</h3>
      </div>
    </div>
    <hr />
    <div class="gridD">
      <div class="grid5">
        <h3></h3>
      </div>

      <div class="6">
        <h3>Total</h3>
      </div>
      <div class="7">
        <h3>1489</h3>
      </div>
    </div>
    <!-- Attendance page End-->
    <!-- offering page-->
    <div>
      <h1 class="attend">Offering</h1>
    </div>
    <div class="gridB">
      <div class="grid5 offeringItem">
        <h3>Offering Item</h3>
      </div>
      <div class="6">
        <h3>Channel</h3>
      </div>
      <div class="7">
        <h3>Amount</h3>
      </div>
    </div>
    <hr />
    <div class="gridC">
      <div class="grid5">
        <h3>Tithe</h3>
      </div>
       
      <div class="6">
        <h3>Cheque</h3>
      </div>
      <div class="7">
        <h3>123</h3>
      </div>
    </div>
    <hr class="line1" />
    <div class="gridC">
      <div class="grid5">
        <h3>Building</h3>
      </div>
      <div class="6">
        <h3>pos</h3>
      </div>
      <div class="7">
        <h3>344</h3>
      </div>
    </div>
    <hr class="line1" />
    <div class="gridC">
      <div class="grid5">
        <h3>Hospitality</h3>
      </div>
      <div class="6">
        <h3>BankTransfer</h3>
      </div>
      <div class="7">
        <h3>1222</h3>
      </div>
    </div>
    <hr />
    <div class="gridD">
      <div class="grid5">
        <h3></h3>
      </div>

      <div class="6">
        <h3>Total</h3>
      </div>
      <div class="7">
        <h3>1489</h3>
      </div>
    </div>
    <!-- offering page End-->
  </div>
</template>

<script>
export default {
  name: "Church",
};
</script>

<style scoped>
* {
  /* margin-top: 30px; */
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}

.container {
  width: 90%;
  height: 1500px;
}

.grid {
  display: grid;
  grid-template-columns: 60% 30%;
}
.grid1 {
  background-color: #980404;
  height: 120px;
}
.grid1 h1 {
  margin-left: 50px; 
  margin-top: 30px;
  color: #ffffff;
  font-size: 32px;
}
.grid2 {
  background-color: #ff2b2a;
  height: 120px;
}
.header4 {
  text-align: center;
  color: white;
  margin-top: 20px;
  font-size: 14px;
}
.header41 {
  text-align: center;
  color: white;
  margin-top: 0;
}
.gridA {
  margin-left: 50px;
  display: grid;
  grid-template-columns: 40% 40%;
}
.grid3 {
  margin-left: 0px;
  margin-top: 50px;
  height: 200px;
}
.grid4 {
  margin-top: 50px;
  height: 200px;
   margin-left: 200px;
}
.flex2 {
  text-align: right;
  font-size: 14px;
}
.flex3 {
  margin-left: 50px;
  font-size: 14px;
}
.flex1 {
  display: flex;
  margin: 0;
  padding: 0;
}
.grid3 h1 {
  color: #252a2f;
  font-size: 20px;
}
.grid3para {
  margin-top: 30px;
  color: #252a2f;
  font-size: 14px;
}
.grid3para2 {
  margin-top: 60px;
  color: #980404;
  font-size: 14px;
}
.attend {
  margin-top: 50px;
  background: #1c252c;
  color: white;
  width: 200px;
  padding-left: 50px;
  margin-bottom: 50px;
  font-size: 24px;
}
.gridB {
  display: grid;
  grid-template-columns: 30% 45% 10%;
  margin-left: 50px;
}
.gridB h3 {
  color: #1c252c;
  font-size: 19px;
  font-style: bold;
}

.gridC h3 {
  color: #002044;
  font-size: 14px;
}
.gridC {
  margin: 0;
  display: grid;
  grid-template-columns: 30% 45% 10%;
  margin-left: 50px;
}
.gridD {
  margin: 0;
  display: grid;
  grid-template-columns: 30% 45% 10%;
  margin-left: 50px;
}
hr {
  border-width: 2px;
  color: black;
  width: 100%;
}
.line1{
  border-width: 1px;
  color: black;
  width: 100%;
}
@media (max-width:600px) {
  * {
    margin-top: 30px;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
  }
  .container {
    width: 90%;
    height: 1500px;
  }
  .grid {
    display: grid;
    grid-template-columns: 60% 30%;
  }
  .grid1 {
  background-color: #980404;
  height: 120px;
}
.grid1 h1 {
  margin-left: 50px;
  margin-top: 30px;
  color: #ffffff;
  font-size: 25px;
}
.grid2 {
  background-color: #ff2b2a;
  height: 120px;
}
.header4 {
  margin-left: 1px;
  color: white;
  margin-top: 20px;
  font-size: 14px;
}
.header41 {
  margin-left: 10px;
  color: white;
  margin-top: 0;
}
 .gridA {
    margin: auto;
    display: grid;
    grid-template-columns: 90%;
  }
  .grid3 {
    margin-left: 50px;
    padding: 0px;
    margin-top: 0px;
    height: 200px;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .grid4 {
    margin-top: 20px;
    height: 200px;
    grid-column-start: 1;
    grid-row-start: 3;
    margin-left: 50px;
  }
  .flex1 {
    display: flex;
  }

  .flex2 {
    text-align: right;
    margin-left: 0px;
    font-size: bold;
  }
    hr {
    border-width: 2px;
    color: black;
    margin-left: 10%;
    width: 90%;
  } 
     .line1 {
    border-width: 1px;
    color: black;
    margin-left: 10%;
    width: 90%;
  } 
}
</style>