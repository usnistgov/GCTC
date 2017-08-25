// URL beginning and end, which will be used with the key
// To give Tabletop a URL
//var google_docs_one = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=';
//var google_docs_two = '&output=html';

// Google Docs spreadsheet key
//var spreadsheet_key = '1hHJJmRBA1D6-g9wtfvnjvsndP-NxgyzOmFJBC8L2PPQ';

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/17ZB3zMK-7B-30ILZ7_yyq9D6JLCqnMmldYhQNhxo8D0/pubhtml';

//old spreadsheet ---- https://docs.google.com/spreadsheets/d/1VnkWfpuGms0TADl3ULik2yJ1nevttJ9g9kq2qjTlRc8/pubhtml


// Template sources and what DIVs they will appear in
var templates = [
    {
        "templatesource": "#datatable-template",
        "templatehtml": "#searchable-table tbody",
        "sheet": "ActionClusters"
    }
];

// DataTables formatting options
// More options: http://datatables.net/plug-ins/sorting

// Formatted numbers: i.e. numbers with commas
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "formatted-num-pre": function ( a ) {
        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    "formatted-num-asc": function ( a, b ) {
        return a - b;
    },
    "formatted-num-desc": function ( a, b ) {
        return b - a;
    }
});
// Currency
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function ( a ) {
        a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    
    "currency-asc": function ( a, b ) {
        return a - b;
    },
    
    "currency-desc": function ( a, b ) {
        return b - a;
    }
});
// Percentages
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function ( a ) {
        var x = (a == "-") ? 0 : a.replace( /%/, "" );
        return parseFloat( x );
    },
 
    "percent-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "percent-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});


var DataTablesLinkify = function(DataTable) {
    this.dataTable = DataTable;
    this.url = location.protocol+'//'+location.host+location.pathname;
    this.link = function() {
        return this.url +
            '?dtsearch='+this.dataTable.search() +
            '&dtpage='+this.dataTable.page();
            //more params like current sorting column could be added here
    }
    //based on http://stackoverflow.com/a/901144/1407478
    this.getParam = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    this.restore = function() {
        var page = this.getParam('dtpage'), 
            search = this.getParam('dtsearch');
        if (search) this.dataTable.search(search).draw(false);
        if (page) this.dataTable.page(parseInt(page)).draw(false);
        //more params to take care of could be added here
    }
    this.restore();
    return this;
};


// Load up the DataTable

var oTable;

/*
function myPillFilter(data) {
	 yadcf.exFilterColumn(oTable, [[1, data]]);
	}
	*/
	
function loadDataTable() {	
	
    // Load Datatables after Tabletop is loaded
    oTable = $('#searchable-table').DataTable({        
		
		dom: "Bf<'paginationWrap'irlp>",		
		order:[[0, "asc"]],
		oLanguage: {
            "sLengthMenu": "_MENU_ records per page"
        },
        iDisplayLength: 25,		
		fixedColumns: true
		
		
    });
	

	
// Close loadDataTable
};


// Use Handlebars to load data from Tabletop to page
function loadToDOM(tabletop_data, tabletop) {
    // Loop through templates
    _.each(templates, function(element, num_templates) {
    	// Grab HTML of template and compile with Handlebars
    	var template_html = element['templatehtml'];    
    	var source = $(element["templatesource"] + "").html();
    	var sheet = element["sheet"];
        var handlebarscompile = Handlebars.compile(source);

		// Render the templates onto page
		$(template_html).append(handlebarscompile( tabletop.sheets(sheet) ));
	// Close each statement
    }, this);

    loadDataTable(),
	linkify = DataTablesLinkify(oTable);
	
	//function scrollToHash(hashName) { location.hash = "#" + hashName; }
}


// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
	Tabletop.init({
    	key: public_spreadsheet_url,
    	callback: loadToDOM,
    	simpleSheet: true,
    	debug: false
    });
}

// Load Tabletop
initializeTabletopObject();

