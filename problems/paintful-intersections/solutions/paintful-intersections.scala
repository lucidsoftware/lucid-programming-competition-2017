import java.util.Scanner

final case class Point(x: Double, y: Double) {
  def *(scale: Double) = Point(x * scale, y * scale)
  def /(scale: Double) = Point(x / scale, y / scale)
  def +(point: Point) = Point(x + point.x, y + point.y)
  def -(point: Point) = Point(x - point.x, y - point.y)
  def ×(point: Point) = x * point.y - y * point.x
}

final case class Line(a: Point, b: Point) {
  def intersect(line: Line) = {
    val diff = a - b
    val lineDiff = line.a - line.b
    diff × lineDiff match {
      case 0 => None
      case w => Some((lineDiff * (a × b) - diff * (line.a × line.b)) / w)
    }
  }
}

final class Polygon(val vertices: Seq[Point]) {
  def area = edges.map { case (a, b) => a × b }.sum / 2

  def contains(point: Point) = edges.forall { case (a, b) => -1e-9 < (point - b) × (a - b) }

  def edges = (vertices.iterator ++ vertices.headOption).sliding(2).map { case Seq(a, b) => a -> b }
}

object Polygon {
  def apply(points: Seq[Point]) = {
    val base = points.reduce(_ + _) / points.size
    new Polygon(points.sortBy { point =>
      val Point(x, y) = point - base
      math.atan2(y, x)
    })
  }

  def parse(input: Scanner) =
    apply(Iterator.continually(Point(input.nextDouble(), input.nextDouble())).take(input.nextInt()).toSeq)
}

object Main {
  def main(args: Array[String]) = {
    val input = new Scanner(System.in)
    val a = Polygon.parse(input)
    val b = Polygon.parse(input)
    val intersections = for {
      (a1, a2) <- a.edges
      (b1, b2) <- b.edges
      intersection <- Line(a1, a2) intersect Line(b1, b2)
    } yield intersection
    val vertices = (a.vertices ++ b.vertices ++ intersections).filter(point => a.contains(point) && b.contains(point))
    printf("%.3f\n", Polygon(vertices).area)
  }
}
