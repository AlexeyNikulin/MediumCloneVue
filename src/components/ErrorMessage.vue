<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'McvErrorMessage',
    props: {
        message: {
            type: String,
            require: false,
            default: 'Something went wrong'
        }
    }
}
</script>