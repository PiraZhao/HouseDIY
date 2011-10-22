var isChosen : boolean;
var isOnOBJ : boolean;
var objChosen : GameObject = null;
var touchPos : Vector3;

function Start()
{
	isChosen = false;
	isOnOBJ = false;
}

function Update () 
{

	if (Input.touchCount == 1) {
	
		// Use Raycast to pick objects that have mesh colliders attached.
		var touch = Input.GetTouch(0);
		var ray = Camera.main.ScreenPointToRay (touch.position);
		var hit : RaycastHit = new RaycastHit();
	
		// If cast some objects	
		if (Physics.Raycast (ray, hit, 200)) {
			Debug.Log(hit.collider.name);

			// Test whether chosen or touch on plane			
			if (!isChosen && hit.collider.name != "Plane") {
				isChosen = true;
				objChosen = GameObject.Find(hit.collider.name);
				
				if (touch.tapCount == 2) {
					isOnOBJ = true;
					touchPos = touch.position;
				}
			}
		}
		
		// if touch on any object
		if (isChosen) {
			if (isOnOBJ) {
				// calculate the rotation
				var vec = new Vector3();
				vec.x = -touch.deltaPosition.y;
				vec.y = 0;
				vec.z = touch.deltaPosition.x;
				
				objChosen.transform.Rotate(vec);
			}// operating on obj ( rotate etc. )
			else {
				var rayTouch  = Camera.main.ScreenPointToRay(Input.GetTouch(0).position	);
				var hitInfo : RaycastHit;
				if (Physics.Raycast (rayTouch, hitInfo)) {
					var pos = objChosen.transform.position;
					pos.x = hitInfo.point.x;
					pos.z = hitInfo.point.z;
					objChosen.transform.position = pos;
				}
			}
		}// Obj transform
		
		// When touch ended
		if (Input.GetTouch(0).phase == TouchPhase.Ended) {
			isChosen = false;
		}
		
	}// touchCount == 1
}

function OnGUI() 
{
	if (isOnOBJ && GUI.Button(Rect(touchPos.x+5, touchPos.y+5, 60, 30), "OK")) {
		isOnOBJ = false;
	}
}
