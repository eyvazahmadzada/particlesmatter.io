class upQuark extends Quark {
	constructor(x, y, color, vel) {
		super(2.2, x, y, 'u', color, 20, vel);
	}
}

class downQuark extends Quark {
	constructor(x, y, color, vel) {
		super(4.7, x, y, 'd', color, 20, vel);
	}
}