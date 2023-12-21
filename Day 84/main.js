window.addEventListener("DOMContentLoaded",() => {
	const gts = new GooeyToggleSwitch("#dummy");
});

class GooeyToggleSwitch {
	pristineClass = "switch--pristine";

	constructor(el) {
		this.el = document.querySelector(el);
		this.el?.parentElement?.classList.add(this.pristineClass);
		this.el?.addEventListener("change",this.makeDirty.bind(this));
	}
	makeDirty() {
		this.el?.parentElement?.classList.remove(this.pristineClass);
	}
}