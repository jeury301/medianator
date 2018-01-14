var controllers = angular.module('medianator.controllers', [])

/*
Landing controller:
*/
controllers.controller('Home', function($scope, $state, $ionicPlatform){
	
	$scope.local_numbers = []
	$scope.local_input = ""
	$scope.clear = function(){
		$scope.local_numbers = []
		$scope.user_input = ""
		$scope.last_number = ""
	}

	$scope.mean = function(){
		if($scope.local_numbers.length > 0){
			if($scope.local_numbers[0] > 7){

				var sum = $scope.clacular_mediana()
				console.log(sum)
				if (sum >= 10 && sum <= 100)
				{
					$scope.local_input = "Mediana: "
					$scope.user_input = " "+sum
				}
				else{
					$scope.user_input = "Fuera de rango."
				}
				
			}
			else{
				$scope.user_input = " Primer <= 7"
			}

			$scope.local_numbers = []
			$scope.last_number = ""
		}

	}

	$scope.append = function(number){

		if($scope.user_input == "Invalid Input")
			$scope.user_input = ""
		if(String($scope.local_input).includes("Mediana: ")){
			$scope.user_input = ""
			$scope.local_input = ""
		}
		if($scope.user_input)
			$scope.user_input = String($scope.user_input) + String(number)
		else
			$scope.user_input = " "+number
	}

	$scope.enter = function(){
		
		var current = String($scope.user_input).trim()

		if(current !="")
		{
			if(isNaN(current)){
				$scope.user_input = "Invalid Input"
			}
			else{
				$scope.last_number = " "+current
				$scope.local_numbers.push(current)
				$scope.user_input = ""
			}
		}
	}

	$scope.clacular_mediana = function(){
		console.log($scope.local_numbers)
		var unordered = $scope.local_numbers
		var ordered = []
		var mediana = 0
		//Ordenando valores de menor a mayor
		while (unordered.length > 0){
			//[10, 9, 15, 20, 5]
			var min = $scope.local_numbers[0]; //10
			var index_found = 0 //0

			for(var i=0;i<unordered.length;i++){
				if(Number(unordered[i]) <= min){
					index_found = i
					min = Number(unordered[i])
				}
			}
			//min = 5
			//index_found = 4
			ordered.push(min)//entrar en lista
			unordered.splice(index_found, 1)//sacar de lista
			//[10, 9, 15, 20] -- unordered
			//[5] -- ordered
		}
		console.log(ordered)
		//Obteniendo la mediana
		if(ordered.length%2==0){
			mediana = (ordered[ordered.length/2 - 1] + ordered[ordered.length/2])/2
		}
		else{
			mediana = ordered[(ordered.length-1)/2]
		}

		return mediana
	}
});
