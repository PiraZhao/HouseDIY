var isChosen = false;
var objChosen : GameObject = null;

var onTop = true;

function Update () 
{
	
	// Use Raycast to pick objects that have mesh colliders attached.
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit = new RaycastHit();
	
	if (Input.GetMouseButtonDown (0)) {  //Returns true during the frame the user touches the object
		Debug.Log("Left Mouse Down!");
		if (Physics.Raycast (ray, hit, 200)) {
			Debug.Log(hit.collider.name);
			
			if (hit.collider.name != "Plane") {
				isChosen = true;
				objChosen = GameObject.Find(hit.collider.name);
			}
		}
	}
	
	// if mouse click down on any object
	if (isChosen && onTop) {
		var pos = Camera.main.ScreenToViewportPoint(Input.mousePosition);
		Debug.Log("BB: " + pos.x + ":" + pos.y + ":" + pos.z);
//		var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);

		// modify the coordinates
		pos.z = pos.y;
		pos.y =  objChosen.transform.position.y;
		pos.x = (pos.x - 0.5) * 200;							// translate into the coordinates
		pos.z = (pos.z - 0.5) * 111;
//		Debug.Log("CC: " + pos.x + ":" + pos.y + ":" + pos.z);
		objChosen.transform.position = pos;
	}	
	
	if (Input.GetMouseButtonDown(1)) {
		Debug.Log("Right Mouse Down!");
	}
	
	
	
	if (Input.GetMouseButtonUp (0)) {  //Returns true during the frame the user deselects the object
		isChosen = false;
	}
}

var pos_side = new Vector3(0, 45, -90);
var rot_side = new Vector3(28, 0, 0);
	
var pos_top = new Vector3(0, 120, 0);
var rot_top = new Vector3(90, 0, 0);

function OnGUI() 
{
	if (GUI.Button(Rect(2, 100, 80, 80), "Change\n  View")) {
		onTop = !onTop;
		if (onTop) {
			Camera.main.transform.position = pos_top;
			Camera.main.transform.rotation = Quaternion.identity;
			Camera.main.transform.Rotate(rot_top);
		} else {
			Camera.main.transform.position = pos_side;
			Camera.main.transform.rotation = Quaternion.identity;
			Camera.main.transform.Rotate(rot_side);
		}
	}
}