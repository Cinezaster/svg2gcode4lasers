import React from 'react'
import { render, findDOMNode } from 'react-dom'
import {DefaultButton} from 'pui-react-buttons'
import {BasicPanelAlt, Panel} from 'pui-react-panels'
import {Row, Col} from 'pui-react-grids'
import {AltCollapse} from 'pui-react-collapse'
import paper from '../../node_modules/paper/dist/paper-full.js'
import {ButtonGroup, Button, Input} from 'react-bootstrap';

paper.install(window)


class SVGImport extends React.Component {
	constructor() { 
    super();
    this.fileLoaded = this.fileLoaded.bind(this);
  }
	fileLoaded (e) {
		e.preventDefault();
		e.stopPropagation()
  	var self = this;
  	if (e.target.files) {
  		var file = e.target.files[0]
  	} else {
  	 var file = e.dataTransfer.files[0];
  	}
  	if (file.type === "image/svg+xml") {
  		paper.project.clear()
  		paper.project.importSVG(file, function () {
  			self.props.setProject(paper.projects.length)
  		})

  	}
	}
	render () {
		return (
			<BasicPanelAlt title="Svg Uploader">
				<Input type="file" onChange={this.fileLoaded}/>
			</BasicPanelAlt>
		)
	}
}

class SVGPreview extends React.Component {
	constructor () {
		super();
	}
	componentDidMount () {
		var el = this.refs.canvas
		paper.setup(el)

		console.log(el)
	}
	render () {
		return (
			<BasicPanelAlt title="Preview">
				<canvas id="canvas" ref="canvas" width="170px" height="220px"/>
			</BasicPanelAlt>
		)
	}
}

class TreeNode extends React.Component {
	constructor () {
		super ()
	}
	render () {
		console.log(this.props.parent)
		return (
			<Panel title={this.props.parent.constructor.name}>
				<div>size: {this.props.parent.bounds.x}x{this.props.parent.bounds.y}</div>
				{this.props.node.map(function (item,i) {
					return (
						<TreeNodeSub key={i} item={item}/>
					)
				})}
			</Panel>
		)
	}
}
class TreeNodeSub extends React.Component {
	constructor () {
		super ()
		this.selectItem = this.selectItem.bind(this);
	}
	selectItem (e) {
		e.preventDefault();
		e.stopPropagation();
		var item = this.props.item
		var prevSelectedState = item.selected
		paper.projects[0].deselectAll()
		item.selected = (prevSelectedState)? false:true;
		paper.view.update()
		item.layer.off('mousedown')
		item.layer.on('mousedown', function (e) {
			var down = e.point;
			var center = item.bounds.center;
			var offset = new Point(down.x - center.x, down.y - center.y)
			item.layer.on('mousemove', function (e) {
				item.position = new Point(e.point.x - offset.x, e.point.y - offset.y)
			})
			item.layer.on('mouseup', function () {
				item.layer.off('mousemove');
				item.layer.off('mouseup');
			})
		})
	}
	render () {
		var item = this.props.item
		var nextList,type, end;
		switch (item.constructor.name) {
			case "Project" : {
				// check for layers
				nextList = item.layers
				type = "Project"
				end = false
				break;
			}
			case "Group" : {
				nextList = item.children
				type = "Group"
				break;
			}
			case "Layer" : {
				// check for children
				nextList = item.children
				type = "Layer"
				break;
			}
			case "Path" :  {
				type = "Path"
				end = true
				break;
			}
			case "Shape" :  {
				type = "Shape"
				end = true
				break;
			}
			case "CompoundPath" : 
				nextList = item.children
				type = "CompoundPath"
				break;
		}
		return (
			<div onClick={this.selectItem}>
				{!end?
					<TreeNode node={nextList} parent={item}/>
				:<div>{type}</div>}
			</div>
		)
	}
}

class SVGPaths extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<BasicPanelAlt title="Svg Paths">
				{(this.props.layers && this.props.layers[0])? 
				<TreeNode node={this.props.layers[0].children} parent={this.props.layers[0]}/>
				:null}
			</BasicPanelAlt>
		)
	}
}

class Settings extends React.Component {
	constructor () {
		super () 
	}
	render () {
		return (
			<BasicPanelAlt title="Settings">
				Laser type:<br/>
				<ButtonGroup>
					<Button>Cutter</Button>
					<Button>Engraver</Button>
				</ButtonGroup>
				Size:<br/>
				<Input className="form-control" placeholder="Length X-axis" type="number" />
				<Input className="form-control" placeholder="Length Y-axis" type="number" />
				<div>
					Power/feedrate settings<br/> 
					<DefaultButton>calibrate wizard</DefaultButton>
				</div>
				<Input type="select" label="Controller">
					<option>grbl</option>
					<option>tinyG</option>
				</Input>
			</BasicPanelAlt>
		)
	}
}

class MainComponent extends React.Component {
	constructor () {
		super ();
		this.setProject = this.setProject.bind(this);
		this.setSettings = this.setSettings.bind(this);
		this.state = {
			paperProject: 0,
			settings: JSON.parse(localStorage.getItem('settings') || '{}')
		}
	}
	componentDidUpdate (prevProps, prevState) {
    localStorage.setItem('settings' ,JSON.stringify(this.state))
	}
	setProject (number) {
		this.setState({
			paperProject: number
		})
	}
	setSettings (obj) {
		this.setState({
			settings: obj
		})
	}
	render () {
		var layers = (paper.projects && paper.projects[0])? paper.projects[0].layers:undefined;
		return (
			<Row className="grid-show">
				<Col md={6}>
					<SVGImport setProject={this.setProject}/>
					<SVGPaths layers={layers}/>
				</Col>
				<Col md={12}>
					<SVGPreview/>
				</Col>
				<Col md={6}>
					<Settings setSettings/>
					<BasicPanelAlt title="Gcode">
						
					</BasicPanelAlt>
				</Col>
			</Row>
		)
	}
}

render(
	(
		<div>
			<MainComponent/>
		</div>
	),document.getElementById('app')
)