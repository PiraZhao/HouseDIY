/*
 * This class is mainly used to manager all the operations
 * 		including touches, move, scale, etc.
 */


class SceneManager
{
	private var arrayObject : ArrayList;
	private var arrayCamera : ArrayList;
	
	function SceneView() {
		arrayObject = new ArrayList();
		arrayCamera = new ArrayList();
	}
	
	// Invoked inside "Update"
	function perform() {
		if (Input.touchCount == 1) {
			if (Input.GetTouch(0).tapCount == 1) {
				performSingleTouch1();
			} else if (Input.GetTouch(0).tapCount == 2) {
				performSingleTouch2();
			}
		} else if (Input.touchCount == 2) {
			performMultiTouch();
		}
	}
	
	// Single touch event with one tapCount
	function performSingleTouch1() {
	}
	
	// Single touch event with two tapcount
	function performSingleTouch2() {
	}
	
	// Multi touch happened
	function performMultiTouch() {
	}
	
}