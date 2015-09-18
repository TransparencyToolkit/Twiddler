var pkg = require('package')('./')

var Templates = {
  project_new: {
    'name': 'twiddler-project',
    'title': 'Twiddler Project',
    'description': 'a little description...',
    'license' : 'PDDL-1.0',
    'version': pkg.version,
    'sources': [],
    'tools': [],
    'output': 'default',
    'order': 'unsorted',
    'formats': [],
    'state': 'waiting'
  },
  project_source_new: {
    'source': '',
    'type': '',
    'hash': ''
  },
  // FIXME: might want to rethink these templates and standardize "opts"
  project_tool_scrub: {
    'tool': 'scrub',
    'sources': [],
    'opts': []
  },
  project_tool_miner: {
    'tool': 'miner',
    'sources': [],
    'opts': {}
  }
}

module.exports = Templates
