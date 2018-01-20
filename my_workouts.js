

$(function() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/my_workouts',
		success: function(res) {
			console.log(res)
			for (var i = 0; i < res.length; i++) {
				console.log(res[i])
				$("#selectUser").append($('<option>', {
					value: res[i],
					text: res[i]
				}))
			}
		}
	})

	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/my_workouts',
		success: function(res) {
			console.log(res)
			for (var y = 0; y < res.length; y++) {
				console.log("this is the ticket:", res[y])
				$("#ticketList").append("<li>" + res[y] + "</li>")
			}
		}
	})


	$('#userSubmit').click(function(e) {
		e.preventDefault()
		var firstName = $('#firstName').val()
		var lastName = $('#lastName').val()

		console.log(firstName)

		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/my_workouts',
			data: {
				first_name : firstName,
				last_name : lastName
			},
			success: function() {
				console.log('it worked')
			}
		})
	})

	$('#ticketSubmit').click(function(e) {
		e.preventDefault()

		var ticketUser = $('#selectUser').val()
		var ticketDescription = $('#body-field').val()
		var ticketDate = $("#example-date-input").val()

		console.log('clicked!', ticketUser, ticketDescription, ticketDate)

		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/my_workouts',
			data: {
				ticket_desc: ticketDescription,
				ticket_due_date: ticketDate,
				ticket_user: ticketUser
			},
			success: function() {
				console.log('it worked')
			}
		})
	})

})




