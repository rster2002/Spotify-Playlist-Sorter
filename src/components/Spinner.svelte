<span class="spinner"></span>

<style lang="scss">

.spinner {
    --size: 0.7em;
    width: var(--size);
    height: var(--size);

    display: inline-block;

    text-align: center;
    border: 2px solid transparent;
    border-top-color: var(--spinner-color);
    border-radius: 1000px;
    animation: spinner 300ms infinite linear;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

</style>
