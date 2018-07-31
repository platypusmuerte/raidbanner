$("#raiderWrapper").effect("bounce",{},2000,() => {
	$("#raiderName").effect("shake",{"distance":150},4000,() => {
		$("#raiderWrapper").effect("bounce",{},1000,() => {
			$("#raiderName").effect("shake",{"distance":150},4000,() => {
				$("#raiderWrapper").effect("bounce",{},1000,() => {
					$("#raiderName").effect("shake",{"distance":150},7000,() => {
						$("#raiderWrapper").effect("puff",{"percent": 300},1000,() => {

						});
					});
				});
			});
		});
	});
});