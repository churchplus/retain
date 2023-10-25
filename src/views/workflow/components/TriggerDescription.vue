<template>
    <div class="container-fluid">
        <div v-if="!hideHeader" class="row d-flex justify-content-end">
            <div class="col-md-4">
                <div class="dropdown text-right">
                    <span class="font-weight-bold text-dark c-pointer"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="pi pi-ellipsis-h" style="font-size: 1.5rem"></i></span>
                    <!-- <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button> -->
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item font-weight-700 c-pointer" @click="removeCurrentTrigger">Remove</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p v-show="!hideHeader" class="text-center" style="font-size:28px">{{ header ? header : 'Giving - Amount' }}</p>
                <p class="text-center" v-if="description && description.id === 2">
                    A member of 
                    <span class="text-success">{{ description.groups.join(' or ') }}</span>
                     gives at least <span class="text-success">{{ description.givenAtLeastTimes }} times</span> per month for
                      <span class="text-success">{{ description.givenForTheLastMonth }} months</span>
                       to <span class="text-success">{{ description.category }} </span> 
                       category and then does not give for the last <span class="text-success">{{ description.notGivenForTheLastMonth }} months</span>
                </p>

                <p class="text-center" v-if="description && description.id === 1">
                    A member of 
                    <span class="text-success">{{ description.groups.join(' or ') }}</span>
                     gives <span class="text-success mx-1">{{ description.range }} </span>
                      <span class="text-success"> {{ currency ? currency : '' }}{{ description.amount }}</span>
                       to <span class="text-success">{{ description.category }}</span> 
                       category in <span class="text-success">{{ description.time.toLowerCase() }}</span>
                </p>

                <p class="text-center" v-if="description && description.id === 3">
                    A member of 
                    <span class="text-success">{{ description.groups.join(', ') }}</span>
                     has pledges <span class="text-success mx-1">{{ description.logicalOperator }} </span>
                      <span class="text-success"> {{ currency ? currency : '' }}{{ description.amount }}</span>
                </p>
                <p class="text-center" v-if="description && description.id === 12">
                    A member of 
                    <span class="text-success">{{ description.groups.join(', ') }}</span>
                     whose <span class="text-success mx-1">{{ description.event }} </span> is
                      <span class="text-success"> {{ description.days }}</span> days in the
                      <span class="text-success">{{ description.pastOrFuture }}</span>
                </p>
                
                <p class="text-center" v-if="description && description.id === 11">A member of <span class="text-success">{{ description.groups.join(' ') }}</span> gives less than <span class="text-success">{{ description.prevTimes }}</span> per month for <span class="text-success">{{ description.prevMonths }}</span> to <span class="text-success">{{ description.category }}</span> category and then gives at least <span class="text-success">{{ description.currentTimes }} per month for <span class="text-success">{{ description.currentMonths }}</span></span></p>
            
                <p class="text-center"
                    v-if="description && description.id === 5"
                >
                    <span>A member of </span>
                    <span class="text-success">{{ description.selectedGroups.join(', ') }}</span> group
                    <span> whose birthday is the </span>
                    <span class="text-success">current day</span>
                </p>
            
                <p class="text-center"
                    v-if="description && description.id === 10"
                >
                    <span>A member of </span>
                    <span class="text-success">{{ description.selectedGroups.join(', ') }}</span> is marked
                    <span class="text-success">{{ description.selectedStatus }} {{ description.numOfTimes }} </span>
                    <span>
                        {{ +description.numOfTimes > 1 ? ' times ' : ' time '}}
                    </span>
                    <span class="text-success"> in the last {{ description.timesInLastWeek }} </span> <span>days</span>
                </p>

                <p class="text-center"
                    v-if="description && description.id === 4"
                >
                    <span>A member is added to </span>
                    <span class="text-success">{{ description.selectedGroups.join(', ') }}</span> group
                    
                </p>
                <p class="text-center"
                    v-if="description && description.id === 6"
                >
                    <span>A Firstimer is added to </span>
                    <span class="text-success">{{ description.selectedGroups.includes('Entire ministry') ? 'the Church' : `${description.selectedGroups.join(', ')} group` }}</span> 
                    
                </p>
                <p class="text-center"
                    v-if="description && description.id === 9"
                >
                    <span>Individual has been in one of these groups</span>
                    <span class="text-success">({{ description.selectedGroups.join(', ') }})</span> for <span class="text-success">{{ description.days }}</span> days
                    
                </p>
                <p class="text-center"
                    v-if="description && description.id === 8"
                >
                    <span>A member was </span> <span class="text-success"> {{ description.logicalOperatorAddOrRemove }} </span>
                    <span class="text-success mx-2"> {{ description.selectedGroups.join(', ') }}</span>
                    
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'header', 'description', 'currency', 'hideHeader' ],

    setup (props, { emit }) {
        const removeCurrentTrigger = () => {
            emit("removetrigger");
        }

        return {
            removeCurrentTrigger,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>