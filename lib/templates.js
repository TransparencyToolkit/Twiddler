
var Templates = {
  project_new: {
    'name': 'your-twiddler-project',
    'title': 'Your Twiddler Project',
    'description': 'will be the start of something new...',
    'license" : "PDDL-1.0',
    'version': '0.1.1',
    'sources': [],
    'tools': [],
    'state': 'waiting'
  },
  project_source_new: {
    'name': '',
    'file': '',
    'hash': '',
    'output': 'default',
    'order': true,
    'formats': []
  },
  // FIXME: might want to rethink these templates and standardize "opts"
  project_tool_scrub_new: {
    'tool': 'srub',
    'sources': [],
    'opts': []
  },
  project_tool_miner_new: {
    'tool': 'miner',
    'sources': [],
    'opts': {}
  }
}

module.exports = Templates
