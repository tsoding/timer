$(() => {
    $('#timer-form').submit((e) => {
        window.open("timer.html?timer-line=" + encodeURIComponent($('#timer-line').val()),
                    "Timer Window",
                    "width=800,height=600");
        e.preventDefault();
    });
    $('#timer-line').focus();
});
