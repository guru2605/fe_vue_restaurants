<template>
    <modal name="add-new-hotel">
        hello, world!
    </modal>
</template>

<script>
export default {
    name: 'AddNewHotel',

    mounted(){
        this.$modal.show('hello-world')
    }
}
</script>

<style>

</style>
