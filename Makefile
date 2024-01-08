
test:
	tmux new-session -s $(node) 'docker run --rm -p 30333:30333 $(node)' \; split-window -h 