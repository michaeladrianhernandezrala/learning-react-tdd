export let container;

export const initializateContainer = () => {
    container = document.createElement('div');
    document.body.replaceChildren(container);
}