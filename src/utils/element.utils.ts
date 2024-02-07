function ignoreBodyScroll(value?: boolean): void {
    const elBody = document.querySelector("body")
    if (!elBody) return

    if (value) {
        elBody.classList.add('no-scroll');
    } else {
        elBody.classList.remove('no-scroll');
    }
}

export const elementUtilService = {
    ignoreBodyScroll
}