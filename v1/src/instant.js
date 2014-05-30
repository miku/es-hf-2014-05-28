/** @jsx React.DOM */

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
      };

// TODO: ignore case in hightlighting
var HitItem = React.createClass({
    highlight: function(str, s) {
        return str.replace(s, "<span class=highlight>" + s + "</span>", "g");
    },
    render: function() {
        return (<div><span dangerouslySetInnerHTML={{__html: this.highlight(
                    this.props.text.trunc(100), this.props.query) }}></span>
                &mdash; <span className="emph">
                {this.props.payload.id}</span> in <span className="emph">
                {this.props.payload.index}</span></div>);
    }
});

var SearchBox = React.createClass({
    getInitialState: function() {
        return {results: [],
                value: "",
                error: null,
                message: null};
    },
    handleChange: function(event) {
        $this = this;
        
        // update input value, reflect that in the display by setting state
        var newValue = event.target.value;
        console.debug("User typed: " + newValue);
        this.setState({value: newValue});

        // results for the new input
        var newResults = [];

        this.setState({message: "Loading..."});

        var data = {suggest: {text: newValue, 
                              completion: {field: "content.245.suggest",
                                           fuzzy: { fuzziness: 1}}}};
        console.debug(JSON.stringify(data));
        $.ajax({
            type: "POST",
            // adjust URL
            url: "http://localhost:9200/ebl,nep,nl,lfer/_suggest",
            data: JSON.stringify(data),
            success: function(data, status) {
                data["suggest"][0]["options"].forEach(function(value) {
                    newResults.push(value);
                });
                $this.setState({message: null});
                $this.setState({results: newResults});
            },
            error: function(data, status) {
                console.debug(data);
                $this.setState({message: data.statusText + "!! &mdash; watch a GIF instead: <a href='https://mediacru.sh/seoCa5-ohaVv'>https://mediacru.sh/seoCa5-ohaVv</a>"});
            },
            dataType: "json"
        });
    },
    render: function() {
        $this = this;
        var hits = [];

        this.state.results.forEach(function(item, i) {
            hits.push(<li><HitItem query={$this.state.value}
                                   text={item.text}
                                   payload={item.payload} /></li>);
        });

        return (<div className="search-widget">
                    <div className="search-box">
                        <input className="search-input" 
                               type="text"
                               value={this.state.value}
                               placeholder="Just type ..."
                               onChange={this.handleChange} />
                    </div>
                    <p className="search-message" dangerouslySetInnerHTML={{__html: this.state.message }}></p>
                    <ul className="search-results">{hits}</ul>
                </div>);            

    }
});

React.renderComponent(<SearchBox />, document.getElementById('example'));
$(".search-input").focus();
