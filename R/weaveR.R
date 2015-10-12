#' Weave html widget in R
#' author Shweta Purushe
#  function call to launch Weave from R
#  author shweta purushe
#'
#' @import htmlwidgets
#'
#' @export
weaveR <- function(columns, width = 900, height = 900) {

  # forward options using x
  x = list(
     columns = columns
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'weaveR',
    x,
    width = width,
    height = height,
    package = 'weaveR'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
weaveROutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'weaveR', width, height, package = 'weaveR')
}

#' Widget render function for use in Shiny
#'
#' @export
renderWeaveR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, weaveROutput, env, quoted = TRUE)
}

#DATA
#xTitle <- c(11, 25, 37, 48, 90, 44, 67, 78, 23, 90, 99, 56, 89, 34, 12, 89, 54, 77, 12, 45)
#yTitle <- c(12, 78, 99, 38, 24, 77, 34, 89, 13, 89, 58, 90, 32, 66, 77, 90, 34, 89, 73, 23)
#columns <- data.frame(xTitle, yTitle)