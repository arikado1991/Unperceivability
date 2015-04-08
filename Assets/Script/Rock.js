#pragma strict
var speed: float;
var dir: Vector3;
function Start () {
	speed  = .5;
}
function setPos(pos: Vector3){
	this.transform.position = pos;
}

function setDir(newDir: Vector3){
	dir = newDir;
}
function Update () {
	transform.position += speed*dir;
}

function OnCollisionEnter(c: Collision){
	Debug.Log("collided");
	c.gameObject.BroadcastMessage("getHit",100);
	GameObject.Destroy(this);
}