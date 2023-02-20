<template>
    <router-link :to="{ name: 'Cars', params: { id: Cars.car_id } }">
        <img :src="property.image_url" :alt="Cars.name" />
        <h3>
            {{ Cars.name }}
        </h3>
        <p>Description: {{ Cars.description }}</p>
        <p>Price: R{{ Cars.price }}</p>
    </router-link>
</template>

<script>
export default {
    props: ["cars"],
};
</script>

<style scoped>
img {
    height: 200px;
    width: 100%;
    object-fit: cover;
}
</style>