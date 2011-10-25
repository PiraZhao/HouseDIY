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
	/*
	if (Input.GetMouseButtonDown(2)) {
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitInfo : RaycastHit;
		if (Physics.Raycast(ray, hitInfo)) {
			if (hitInfo.collider.name == "CameraMain")
				isDown = true;
		}
	}
	*/
	
	var h : float = hSpeed * Input.GetAxis("Mouse X");
	var v : float = vSpeed * Input.GetAxis("Mouse Y");
	cam.transform.Rotate(0, h, 0);
	var x = Mathf.Cos(cam.transform.eulerAngles.y);
	var z = Mathf.Sin(cam.transform.eulerAngles.y);
	Debug.Log(x + " : " + z);
	cam.transform.RotateAround(Vector3.zero, 
		new Vector3(x, 0, z), v);
	/*
	if (cam.transform.eulerAngles.y >= 0 && cam.transform.eulerAngles.y <= 180) {
		if (cam.transform.eulerAngles.x >= 280 && cam.transform.eulerAngles.x <= 360) {
			cam.transform.Rotate(-v, 0, 0);
		} else if (cam.transform.eulerAngles.x >= 270 && cam.transform.eulerAngles.x <= 280) {
			cam.transform.Rotate(-v, 0, h);
		} else {
			if (v > 0) {
				cam.transform.Rotate(-v, 0, 0);
			}
		}
	} else {
		if (v < 0) {
			cam.transform.Rotate(-v, 0, h);
		}
	}
	*/
	
//	Debug.Log("Camera Quaternion:" + cam.transform.rotation.x + ":" + cam.transform.rotation.y
//					+ ":" + cam.transform.rotation.z);
	Debug.Log("Camera Angle: " + cam.transform.eulerAngles.x + ":" + cam.transform.eulerAngles.y
					+ ":" + cam.transform.eulerAngles.z);
}

var pos_side = new Vector3(0, 45, -90);
var rot_side = new Vector3(28, 0, 0);
	
var pos_top = new Vector3(0, 120, 0);
var rot_top = new Vector3(90, 0, 0);

function OnGUI() 
{
	if (GUI.Button(Rect(2, 200, 80, 80), "TOP")) {
		Camera.main.transform.position = pos_side;
		Camera.main.transform.rotation = Quaternion.identity;
		Camera.main.transform.Rotate(rot_side);
	}
	if (GUI.Button(Rect(2, 100, 80, 80), "SIDE")) {
		Camera.main.transform.position = pos_top;
		Camera.main.transform.rotation = Quaternion.identity;
		Camera.main.transform.Rotate(rot_top);
	}
}