(function (d3) {
  'use strict';

  const svg = d3.select('svg');
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const margin = {top:0, right:50, bottom:100, left:75};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const treeLayout = d3.tree().size([innerHeight, innerWidth]);

  const	zoomG = svg
  	  .attr('width', width)
  	  .attr('height', height)
  	.append('g')
  		.attr('transform',`translate(${margin.left}, ${margin.right})`);

  const g = zoomG.append('g')
  		.attr('transform',`translate(${margin.left}, ${margin.right})`);

  svg.call(d3.zoom().on('zoom', () => {
    zoomG.attr('transform', d3.event.transform);
  }));


  d3.json('data.json')
  	.then(data =>{
    	const root = d3.hierarchy(data);
    	const links = treeLayout(root).links();
    	const linkPathGenerator = d3.linkHorizontal()
      	.x(d => d.y)
      	.y(d => d.x);
    
    	g.selectAll('path').data(links)
    		.enter().append('path')
    		.attr('d', linkPathGenerator);
    
    	g.selectAll('text').data(root.descendants())
    		.enter().append('text')
    			.attr('x', d => d.y)
    			.attr('y', d => d.x)
    			.attr('dy', '0.32em')
    			.attr('text-anchor', d => d.children ? 'middle' : 'start')
    			.attr('font-size', d => 2.5 - 0.7*d.depth + 'em')
    			.text(d => d.data.data.id);
  	});

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxuICBzZWxlY3QsIFxuICBqc29uLFxuICB0cmVlLCBcbiAgaGllcmFyY2h5LCBcbiAgbGlua0hvcml6b250YWwsXG4gIHpvb20sXG4gIGV2ZW50XG59IGZyb20gJ2QzJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcbmNvbnN0IHdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbmNvbnN0IGhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuY29uc3QgbWFyZ2luID0ge3RvcDowLCByaWdodDo1MCwgYm90dG9tOjEwMCwgbGVmdDo3NX07XG5jb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbmNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5jb25zdCB0cmVlTGF5b3V0ID0gdHJlZSgpLnNpemUoW2lubmVySGVpZ2h0LCBpbm5lcldpZHRoXSk7XG5cbmNvbnN0XHR6b29tRyA9IHN2Z1xuXHQgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuXHQgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG5cdC5hcHBlbmQoJ2cnKVxuXHRcdC5hdHRyKCd0cmFuc2Zvcm0nLGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnJpZ2h0fSlgKTtcblxuY29uc3QgZyA9IHpvb21HLmFwcGVuZCgnZycpXG5cdFx0LmF0dHIoJ3RyYW5zZm9ybScsYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4ucmlnaHR9KWApO1xuXG5zdmcuY2FsbCh6b29tKCkub24oJ3pvb20nLCAoKSA9PiB7XG4gIHpvb21HLmF0dHIoJ3RyYW5zZm9ybScsIGV2ZW50LnRyYW5zZm9ybSlcbn0pKVxuXG5cbmpzb24oJ2RhdGEuanNvbicpXG5cdC50aGVuKGRhdGEgPT57XG4gIFx0Y29uc3Qgcm9vdCA9IGhpZXJhcmNoeShkYXRhKTtcbiAgXHRjb25zdCBsaW5rcyA9IHRyZWVMYXlvdXQocm9vdCkubGlua3MoKTtcbiAgXHRjb25zdCBsaW5rUGF0aEdlbmVyYXRvciA9IGxpbmtIb3Jpem9udGFsKClcbiAgICBcdC54KGQgPT4gZC55KVxuICAgIFx0LnkoZCA9PiBkLngpO1xuICBcbiAgXHRnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEobGlua3MpXG4gIFx0XHQuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICBcdFx0LmF0dHIoJ2QnLCBsaW5rUGF0aEdlbmVyYXRvcik7XG4gIFxuICBcdGcuc2VsZWN0QWxsKCd0ZXh0JykuZGF0YShyb290LmRlc2NlbmRhbnRzKCkpXG4gIFx0XHQuZW50ZXIoKS5hcHBlbmQoJ3RleHQnKVxuICBcdFx0XHQuYXR0cigneCcsIGQgPT4gZC55KVxuICBcdFx0XHQuYXR0cigneScsIGQgPT4gZC54KVxuICBcdFx0XHQuYXR0cignZHknLCAnMC4zMmVtJylcbiAgXHRcdFx0LmF0dHIoJ3RleHQtYW5jaG9yJywgZCA9PiBkLmNoaWxkcmVuID8gJ21pZGRsZScgOiAnc3RhcnQnKVxuICBcdFx0XHQuYXR0cignZm9udC1zaXplJywgZCA9PiAyLjUgLSAwLjcqZC5kZXB0aCArICdlbScpXG4gIFx0XHRcdC50ZXh0KGQgPT4gZC5kYXRhLmRhdGEuaWQpO1xuXHR9KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXSwibmFtZXMiOlsic2VsZWN0IiwidHJlZSIsInpvb20iLCJldmVudCIsImpzb24iLCJoaWVyYXJjaHkiLCJsaW5rSG9yaXpvbnRhbCJdLCJtYXBwaW5ncyI6Ijs7O0VBVUEsTUFBTSxHQUFHLEdBQUdBLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMxQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztFQUN4QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFB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