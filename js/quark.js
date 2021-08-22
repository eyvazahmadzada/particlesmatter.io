class Quark extends Mover {
	constructor(m, x, y, text, color, r, vel){
		super(m, x, y, text, color, r, vel)
	}
  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 300);
		let K = 100
    let strength = K / distanceSq;

		if (this.color === mover.color)
			strength *= -1;

    force.setMag(strength);
    mover.applyForce(force);

		this.attractStrong(mover);

		this.repulseStrong(mover);
		this.ballCollision(mover)
  }

	attractStrong(mover) {
		let force = p5.Vector.sub(this.pos, mover.pos)
		if (this.color !== mover.color &&  force.mag() < this.r + mover.r + 10) {
			this.vel.setMag(0.5)
		}
	}

	repulseStrong(mover) {
		let force = p5.Vector.sub(this.pos, mover.pos)
		let strength = -0.01
		if (this.text === mover.text) {
			force.setMag(strength)
			mover.applyForce(force)
		}
	}
}