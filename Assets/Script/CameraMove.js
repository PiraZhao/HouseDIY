var cam : GameObject;
var isDown : boolean;

/*
 * Override
 * Use this for initialization
 */
function Start () 
{
	isDown = true;
}

var hSpeed : float = 2.0f;
var vSpeed : float = 2.0f;
var angleOffset : float = 30;

/*
 * Override
 * Update is called once per frame
 */
function Update() 
{
	cam = GameObject.Find("CameraMain");
	
	var touch : Touch;				// valid touch event
	var delta_pos : Vector3;		// touch delta position
	var cam_pos : Vector3;			// current camera postion
	var cam_rot : Vector3;			// current camera rotation
	var vec : Vector3;				// vector for tranfrom
	
	// Touch with two fingers rotate the camera
	if (Input.touchCount > 0 && touchOnObject() == false) {
		Debug.Log("Camera operations ready");
		Debug.Log("Camera touch position: " + Input.GetTouch(0).position.x + ":" + Input.GetTouch(0).position.y);
		if (Input.touchCount == 1) { // Rotate the camera
			Debug.Log("Camera one touch");
			touch = Input.GetTouch(0);
			delta_pos = touch.deltaPosition;
			cam_pos = Camera.main.transform.position;
			cam_rot = cam.transform.eulerAngles;
			
			Debug.Log("Camera rot: " + cam_rot.x + ":" + cam_rot.y + ":" + cam_rot.z);
			
			vec = new Vector3();
			
			vec.y = delta_pos.x;
			cam.transform.Rotate(vec);
		}

			/*			
			if (cam_rot.y >= 0 && cam_rot.y <= 180) {
				// Only display the scene above plane
				if (cam_rot.x >= 270+angleOffset && cam_rot.x <= 360) {
					vec.x = -delta_pos.y;
					vec.y = vec.z = 0;
				} else if (cam_rot.x >= 270 && cam_rot.x <= 270+angleOffset) {
					vec.x = -delta_pos.y;
					vec.y = delta_pos.x;
					vec.z = 0;
				} else {
					// Correct the scene
					// Invoked when cam_rot.x = [0, 270)
					if (delta_pos.y < 0) {
						// Only Down direction permissable
						Debug.Log("Camera move Y > 0");
						vec.x = -delta_pos.y;
						vec.y = vec.z = 0;
					}
				}
			} else {
				// Correct eh scene
				// Invoded when cam_rot.y > 180 (Looking at the bottom of plane)
				if (delta_pos.y < 0) {
					Debug.Log("Camera move Y < 0");
					vec.x = -delta_pos.y;
					vec.y = 0;
					vec.z = delta_pos.x;
				}
			}
			
			cam.transform.Rotate(vec);
		}//touchCount == 1
		/*
		else if (Input.touchCount == 2) { // Move the camera
			Debug.Log("Camera double clicks");
			touch = Input.GetTouch(0);
			delta_pos = touch.deltaPosition;
			cam_pos = cam.transform.position;
			cam_rot = cam.transform.eulerAngles;

			if (cam_rot.x >= 360-angleOffset || cam_rot.x == 0) {
				// Move from the top view
				cam_pos.x += delta_pos.x;
				cam_pos.z += delta_pos.z;
			} else {
				// Move from the side view
				if (cam_pos.x < 0) {
					cam_pos.z += -delta_pos.x;
				} else if (cam_pos.x > 0) {
					cam_pos.z += delta_pos.x;
				} else if (cam_pos.z > 0) {
					cam_pos.x += delta_pos.x;
				} else if (cam_pos.z < 0) {
					cam_pos.x += -delta_pos.x;
				}
			}
			cam.transform.position = cam_pos;
		}//touchCount == 2
		*/
	}//touchObjects() == false
}

var pos_side = new Vector3(0, 45, -90);
var rot_side = new Vector3(28, 0, 0);
	
var pos_top = new Vector3(0, 120, 0);
var rot_top = new Vector3(90, 0, 0);

/*
 * Override
 */
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

/*
 * Test if the touch on any objects
 */
function touchOnObject() {
	var touch = Input.GetTouch(0);
	var ray = Camera.main.ScreenPointToRay (touch.position);
	var hit : RaycastHit = new RaycastHit();

	// If cast some objects	
	if (Physics.Raycast (ray, hit, 200)) {
		// Test whether chosen or touch on plane			
		if (hit.collider.name != "Plane") {
			return true;
		}
	}
	
	return false;
}