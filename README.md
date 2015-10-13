# weaveR
This is the Weave framework ported as a visualization widget to R using the 'htmlwidgets' framework.
Weave is a WEb-based Analysis and Visualization Environment. Check it out at [Weave] (http://www.iweave.com).

##Installation
I am hosting this package here as it is not available on CRAN (yet!!).
Install it from Github after having installed the `devtools` package in R.

 ```
 library("devtools");
 devtools::install_github("shwetapurushe/weaveR");
 ```

 And then load the installed weaveR package with these R commands
 ```
 library("weaveR");
 ```
 Lets prepare some data to send to Weave    
 ```
 x <- c(11, 25, 37, 48, 90, 44, 67, 78, 23, 90, 99, 56, 89, 34, 12, 89, 54, 77, 12, 45)
 y <- c(12, 78, 99, 38, 24, 77, 34, 89, 13, 89, 58, 90, 32, 66, 77, 90, 34, 89, 73, 23)
 f <- data.frame(x, y)
 ```
 then launch Weave (with a default Scatterplot tool) with this R command
 ```
 weaveR(f)
 ```
