/*
 * Source: https://codepen.io/bsolvang/pen/xqWBRY

 */
 /*

 used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

 B = 4 / Math.PI,
 C = -4 / Math.pow( Math.PI, 2 ),
 P = 0.225,

 */

const PIXEL_SIZE = 4;

const Particle = {
 	vx: 		0,
 	vy: 		0,
 	x: 			0,
 	y: 			0,
 	ox: 		0,
 	oy: 		0,
 	xTouch: false,
 	yTouch: false,
 	color: 	[]			//	Color of the particule
};

const CONFIG = {

	src:           "",			//	Image file to split into particles

	// The following parameters have an impact on the number of particules
	size:        1,			// 	Size of a particule. An higher value decrease the image resolution. By example, with a size of 2, one particule represents 4 pixels of the image
	space:       0,			// 	Space between particules. An higher value improve performance but decrease the image resolution.
	scale:       1,			// 	Resize the image before splitting into particles

	radius:      64,		// 	Radius of the circle around the mouse from which particules are ejected
	hold:        false,	//	Define on true, the particules are disturbed even when the mouse stop moving. Maintain an empty cicle around the pointer.
	margin:      500,	// 	Margin around the canvas. This area can contain disturbed particules
	opacity:     1,			//	Opacity of the particules
  shaker:      false, //  Shake particules when first rendered
  looping:     false, //  Explode particles after the shake animation. Loop between all pictures
  touching:    true,
	drag:        0.95,
  ease:        5,  //  Ease speed for the animation
  reverseEase: 4,  //  Ease speed for the reverse animation
  pause:       1,
  onLoad:      null
}

export default class Particles {

	particles = [];
	mouse 		= { x: -1000, y: -1000 };

  config;
	width;
	height;
	ctx;
  canvas;
  rendering   = false;
  touching    = false;
  reversing   = false;
	thickness		= 0;
  alpha       = 256;
  frameCount  = 0;
  imgIndex    = 0;
  imageSrc;
  imageData;
  requestId;
  reverseTimeout;

	constructor(containerTarget, config = {}) {
		this.config			= { ...CONFIG, ...config	}
    this.config.shaker = true;
		this.thickness 	= Math.pow(this.config.radius, 2);
    this.alpha      = this.config.opacity * 256;
    this.config.src = this.config.src.constructor === Array ? this.config.src : [this.config.src];

		//	Load image
    this.config.src.filter((_, i) => i === 0 || this.config.looping)
      .forEach((src, i) => {
        const image 		= new Image();
  		    image.src 			= src;
  		    image.onload 		= () => {
            this.particles[i] = this.createParticles(image);
            if(i === 0)
              this.init(containerTarget, image.width, image.height);
            }
      });
	}

  createParticles(image) {

    const canvas 		= document.createElement('canvas');
		const imgWidth	= image.width * this.config.scale;
		const imgHeight	= image.height * this.config.scale;
    const boxWidth  = imgWidth + this.config.margin * 2;
    const boxHeight = imgHeight + this.config.margin * 2;
    const particles = [];

		canvas.width		= imgWidth;
		canvas.height 	= imgHeight;

		const ctx       = canvas.getContext('2d');
		ctx.scale(this.config.scale, this.config.scale);
		ctx.drawImage(image, 0, 0);

		const data      = ctx.getImageData(0, 0, imgWidth, imgHeight).data;
		ctx.clearRect(0, 0, imgWidth, imgHeight);


		for (let y = 0; y < imgHeight; y += this.config.size + this.config.space) {
				for (let x = 0; x < imgWidth; x += this.config.size + this.config.space) {

						let i = x * PIXEL_SIZE + y * PIXEL_SIZE * imgWidth;

								let color = data.slice(i, i + 3);
		  					let p 		= Object.create(Particle);

								p.x 		= p.ox = p.sx = this.config.margin + x;
							  p.y 		= p.oy = p.sy = this.config.margin + y;

                //  Shake particules
                if(this.config.shaker){
								  p.x = Math.random() * boxWidth;
								  p.y = Math.random() * boxHeight;
								//  p.vx = p.x - p.ox;
								//  p.vy = p.y - p.oy;
                }

								p.xTouch = p.yTouch = true;
								p.color = color;
								particles.push(p);
					//	}
				}
		}

    return particles;
  }

  nextImage() {
    this.imgIndex = (this.imgIndex + 1) % this.particles.length;

    const particles = this.particles[this.imgIndex];
    for (let i = 0, n = particles.length; i < n; i++) {

      const p 	= particles[i];

      p.ox = p.sx;
      p.oy = p.sy;
    //  p.vx = p.x - p.ox;
    //  p.vy = p.y - p.oy;
      p.xTouch = p.yTouch = true;
    }

    this.reversing = false;
    this.render();
  }

	init(containerTarget, imageWidth, imageHeight) {

		const container = document.getElementById(containerTarget || 'particles');
		if(!container) {
			console.error("No container element found with id " + containerTarget + "!")
      return;
    }

		this.canvas 		= document.createElement('canvas');
		// const imgWidth	= image.width * this.config.scale;
		// const imgHeight	= image.height * this.config.scale;
    //
		// this.canvas.width		= this.width 	= imgWidth + this.config.margin * 2;
		// this.canvas.height 	= this.height	= imgHeight + this.config.margin * 2;
		this.canvas.width		= this.width 	= imageWidth * this.config.scale + this.config.margin * 2;
		this.canvas.height 	= this.height	= imageHeight * this.config.scale + this.config.margin * 2;

//    this.createParticles(image);

 		this.ctx = this.canvas.getContext('2d');
// 		this.ctx.scale(this.config.scale, this.config.scale);
// 		this.ctx.drawImage(image, 0, 0);
//
// 		const data = this.ctx.getImageData(0, 0, imgWidth, imgHeight).data;
// 		this.ctx.clearRect(0, 0, imgWidth, imgHeight);
//
// //		container.style.marginLeft = -this.config.margin + 'px';
// //		container.style.marginTop = -this.config.margin + 'px';
//
// 		for (let y = 0; y < imgHeight; y += this.config.size + this.config.space) {
// 				for (let x = 0; x < imgWidth; x += this.config.size + this.config.space) {
//
// 						let i = x * PIXEL_SIZE + y * PIXEL_SIZE * imgWidth;
//
// 						//	Don't render darkest pixels (only for optimization)
// 						//if(data[i] > darkestLimit || data[i + 1] > darkestLimit || data[i + 2] > darkestLimit) {
//
// 								let color = data.slice(i, i + 3);
// 		  					let p 		= Object.create(Particle);
//
// 								p.x 		= p.ox = this.config.margin + x;
// 							  p.y 		= p.oy = this.config.margin + y;
//
//                 //  Shake particules
//                 if(this.config.shaker){
// 								  p.x = Math.random() * this.width;
// 								  p.y = Math.random() * this.height;
// 								  p.vx = p.x - p.ox;
// 								  p.vy = p.y - p.oy;
//                 }
//
// 								p.xTouch = p.yTouch = true;
// 								p.color = color;
// 								this.particles.push(p);
// 					//	}
// 				}
// 		}

    if(this.config.touching)
		  this.canvas.onmousemove = this.container_mouseMoveHandler;

		container.appendChild(this.canvas);

    this.imageData 	= this.ctx.createImageData(this.width, this.height);

    if(this.config.onLoad)
      this.config.onLoad(this.particles[0].length);

		this.render();
	}


  destroy() {
    cancelAnimationFrame(this.requestId);
    clearTimeout(this.reverseTimeout);
    this.particles  = null;
    this.imageData  = null;
    if(this.canvas) {
      this.canvas.onmousemove = null;
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas     = null;
    }
    this.ctx        = null;
    this.config     = null;
  }


	render = () => {

    this.rendering = true;

    let   moving      = false;
		const data 				= this.imageData.data;
    const ease        = this.reversing ? this.config.reverseEase / 100 : this.config.ease / 100;
    const drag        = this.config.drag;
    const particles   = this.particles[this.imgIndex];
    data.fill(0);

    for (let i = 0, n = particles.length; i < n; i++) {

      const particle 	= particles[i];

			if(this.touching) {

				let shiftX 		= this.mouse.x - particle.ox;
				let shiftY 		= this.mouse.y - particle.oy;
				let shift			= shiftX * shiftX + shiftY * shiftY;

					//	Check if pixel must be moved
				if(shift < this.thickness) {

          shiftX 		= this.mouse.x - particle.x;
          shiftY 		= this.mouse.y - particle.y;
          shift			= shiftX * shiftX + shiftY * shiftY;

				  if(shift < this.thickness && shift !== 0) {

					  const f 	= -this.thickness / shift;
				    const rad = Math.atan2(shiftY, shiftX);

				    particle.vx += f * Math.cos(rad);
				    particle.vy += f * Math.sin(rad);

				    particle.yTouch = particle.xTouch = true;

          }
				}
			}

      //  Move particles
			if(particle.xTouch){
				particle.x += (( particle.vx *= drag ) + (particle.ox - particle.x) * ease);

				if((particle.x + 0.5 | 0) === particle.ox){
					particle.x = particle.ox;
					particle.xTouch = false;
				}

        //if(!++particle.frameX)
					//particle.xTouch = false;
			}

			if(particle.yTouch){
				particle.y += (( particle.vy *= drag ) + (particle.oy - particle.y) * ease);

				if((particle.y + 0.5 | 0) === particle.oy){
					particle.y = particle.oy;
					particle.yTouch = false;
				}

        //if(!++particle.frameY)
				//	particle.yTouch = false;
			}

      moving = moving || particle.xTouch || particle.yTouch;

			// Render the particule
			for(let pixelX = 0; pixelX < this.config.size; pixelX++) {
				for(let pixelY = 0; pixelY < this.config.size; pixelY++) {

					const i	= (~~particle.x + pixelX + ((~~particle.y + pixelY) * this.width)) * PIXEL_SIZE;

          if(data[i + 3] === 0 || particle.xTouch || particle.yTouch) {
					  data[i] 		= particle.color[0];
					  data[i + 1] = particle.color[1];
					  data[i + 2] = particle.color[2];
					  data[i + 3] = this.alpha;
          }
				}
			}

		}

		this.touching = this.config.hold;
		this.ctx.putImageData(this.imageData, 0, 0);

    this.frameCount++;

    this.rendering = moving;
    if(moving)
		  this.requestId = requestAnimationFrame(this.render);
    else {
      if(this.config.looping) {
        if(this.reversing) this.nextImage();
        else this.reverseTimeout = setTimeout(this.reverse, this.config.pause * 1000);
      }
    }
	}

  reverse = _ => {

    const particles = this.particles[this.imgIndex];
    for (let i = 0, n = particles.length; i < n; i++) {

      const p 	= particles[i];

      p.ox = Math.random() * this.width + 0.5 | 0;
      p.oy = Math.random() * this.height + 0.5 | 0;
      p.vx = 0;
      p.vy = 0;
      p.xTouch = p.yTouch = true;
    }

    this.reversing = true;
		this.render();
  }


	container_mouseMoveHandler = e => {

		let bounds = e.target.getBoundingClientRect();

		this.mouse.x = e.clientX - bounds.left;
		this.mouse.y = e.clientY - bounds.top;

		this.touching = true;

    clearTimeout(this.reverseTimeout);
    if(!this.rendering) this.render();
	}

}
