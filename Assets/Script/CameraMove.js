var cam : GameObject;
var isDown : boolean;

// Use this for initialization
function Start () 
{
	isDown = true;
}

var hSpeed : float = 2.0f;
var vSpeed : float = 2.0f;

// Update is called once per frame
function Update() 
{
	cam = GameObject.Find("CameraMain");
	
	// Touch with two fingers rotate the camera
	if (Input.touchCount == 2) {	
		var t1 = Input.GetTouch(0);
		var delta_pos = t1.deltaPosition;
		
		// translate (x, y) into (x, z) to adapt the coordinate
		var vec = new Vector3();
		vec.x = -delta_pos.y;
		vec.y = 0;
		vec.z = delta_pos.x;
		
		cam.transform.Rotate(vec);
	}

}

var pos_side = new Vector3(0, 45, -90);
var rot_side = new Vector3(28, 0, 0);
	
var pos_top = new Vector3(0, 120, 0);
var rot_top = new Vector3(90, 0, 0);

function OnGUI() 
{
	if (GUI.Button(Rect(2, 100, 80, 80), "TOP")) {
		Camera.main.transform.position = pos_top;
		Camera.main.transform.rotation = Quaternion.identity;
		Camera.main.transform.Rotate(rot_top);
	}
	if (GUI.Button(Rect(2, 200, 80, 80), "SIDE")) {
		Camera.main.transform.position = pos_side;
		Camera.main.transform.rotation = Quaternion.identity;
		Camera.main.transform.Rotate(rot_side);
	}
}
