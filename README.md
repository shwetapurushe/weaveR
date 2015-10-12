# weaveR
This is the Weave framework ported as a visualization widger to R using the 'htmlwidgets' framework.
Weave is a WEb-based Analysis and Visualization Environment. Check it out at [Weave] (http://www.iweave.com).

##Installation
I am hosting this package here as it is not available on R (yet!!).
Install it from Github after having installed the `devtools` package in R.

 ```
 library("devtools");
 devtools::install_github("shwetapurushe/weaveR");
 ```

 And then load the installed weaveR package with these R commands
 ```
 library("weaveR");
 x <- c(1, 2, 4 ,5)
 y <- c(9, 6, 7 ,8)
 f <- data.frame(x, y)     
 ```
 then launch Weave (with a default Scatterplot tool) with this R command
 ```weaveR(f)```