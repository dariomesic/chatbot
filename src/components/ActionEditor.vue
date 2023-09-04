<template>
    <div class="header">
        <div style="flex: 0 0 23%;margin:2px">
            <input placeholder="Untitled action" type="text" title="Kako da promijenim NS zapise?" aria-describedby="" autocomplete="off" maxlength="64" value="Kako da promijenim NS zapise?" style="border-bottom: 1px solid #8d8d8d;height: 2.5rem;">
        </div>
        <div style="flex: 1 1"/>
        <div style="display:flex">
            <button tabindex="0" disabled="" type="button">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Saved" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" role="img" class="bx--btn__icon">
                    <path d="M13.9,4.6l-2.5-2.5C11.3,2.1,11.1,2,11,2H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V5	C14,4.9,13.9,4.7,13.9,4.6z M6,3h4v2H6V3z M10,13H6V9h4V13z M11,13V9c0-0.6-0.4-1-1-1H6C5.4,8,5,8.4,5,9v4H3V3h2v2c0,0.6,0.4,1,1,1	h4c0.6,0,1-0.4,1-1V3.2l2,2V13H11z"></path>
                </svg>
            </button>
            <div></div>
            <button @click="$router.push('/')" tabindex="0" type="button">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Close" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32" role="img" class="bx--btn__icon">
                    <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<style scoped>
.header {
    display: flex;
    height: 3rem;
    max-height: 3rem;
    border-bottom: 1px solid lightgray;
}

.header button{
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
}

.header button:hover{
    background: var(--hover__color);
    transition: .2s;
}
</style>