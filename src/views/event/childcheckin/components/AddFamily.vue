<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-md-10 mx-auto">
                <div class="row">
                    <div class="col-md-3 text-right">
                        <label for="" class="font-weight-700">Father</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <div class="row my-3 tr-border-bottom pb-5">
            <div class="col-md-10 mx-auto">
                <div class="row">
                    <div class="col-md-3 text-right">
                        <label for="" class="font-weight-700">Mother</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4 mb-3">
            <div class="col-md-10 mx-auto d-flex justify-content-end">
                <button class="default-btn font-weight-bold border primary-text add-ward-btn"
                    data-toggle="modal" data-target="#addWard"
                >Add ward</button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-10 mx-auto">
                <FamilyWards />
            </div>
        </div>

        <div class="row my-5">
            <div class="col-md-10 mx-auto d-flex justify-content-center my-5">
                <button class="default-btn text-dark font-weight-bold border mx-4">Cancel</button>
                <button class="default-btn font-weight-bold border text-white primary-bg mx-4">Save</button>
            </div>
        </div>

        <!-- Add Ward Modal -->
        <div class="modal fade" id="addWard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header py-4">
                    <h4 class="modal-title font-weight-bold px-4" id="exampleModalLabel">Add New Ward</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <AddWard />
                </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import FamilyWards from "./FamilyWards";
import AddWard from "./AddWard"

export default {
    components: { FamilyWards, AddWard },
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
    .add-ward-btn {
        border: 1px solid #2E67CE !important;
    }
</style>