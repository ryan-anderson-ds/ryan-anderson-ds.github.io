# Project Rules

## Jekyll Development

- After making any changes, restart the Jekyll server: `pkill -f jekyll 2>/dev/null; sleep 1 && export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH" && bundle exec jekyll serve --detach`
- Note: `_config.yml` changes are never live-reloaded by Jekyll and always require a restart. Other file changes also need a restart since we run in detached mode (no auto-regeneration).
