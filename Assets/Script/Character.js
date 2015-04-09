#pragma strict
var speed: float = 0.1;
var anim: Animator;
var projectile: GameObject;
var hitpoints = 500;
function Start () {
	anim = this.GetComponent(Animator);
}
function getHit(dmg: int){
	hitpoints -= dmg;
}


function Update () {
	if (anim.GetFloat("Cooldown") <= 0){
		if (Input.GetKey('z')){
			// attack
			anim.SetBool("Attack", true);
			anim.SetFloat("Cooldown", .3);
		}
		if (Input.GetKey('x')){
			anim.SetFloat("Cooldown", .4);
			var bullet = GameObject.Instantiate(projectile);
			bullet.BroadcastMessage('setDir', Vector3(0,0,1));
			bullet.BroadcastMessage('setPos', this.transform.position);
		}
	}
	// movements stuffs
	var dir: Vector3;
	if (Input.GetKey("up"))
		dir = Vector3.forward;
	else if (Input.GetKey("down"))
		dir = Vector3.back;
	else if (Input.GetKey("right"))
		dir = Vector3.right;
	else if (Input.GetKey("left"))
		dir = Vector3.left;
	transform.position += dir*speed;
		
	// make the model stop swinging his arm after the attack is over	
	anim.SetFloat("Cooldown", anim.GetFloat("Cooldown") - Time.deltaTime);
	if (anim.GetFloat("Cooldown") <= 0){
		anim.SetBool("Attack", false);	
		//dealing damage code could be put here
	}
	
	if (hitpoints <= 0) GameObject.Destroy(this.gameObject);
}

