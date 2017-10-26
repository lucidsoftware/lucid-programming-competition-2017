import java.util.Scanner
import scala.util.control.Exception._

object Main {
  def main(args: Array[String]) {
    val input = new Scanner(System.in)
    val capacity = input.nextInt()
    val people = input.nextInt()
    val floors = Iterator.continually(input.nextInt()).take(people).toSeq
    val oneWay =
      floors.filter(_ > 0).sorted.reverse.grouped(capacity).map(_.head).sum +
      floors.filter(_ < 0).sorted.map(-_).grouped(capacity).map(_.head).sum
    val distance = 2 * oneWay - (try floors.map(math.abs).max catch { case e: UnsupportedOperationException => 0 })

    val hour = 9 + distance / 3 / 60 % 24
    val minute = distance / 3 % 60
    val second = distance % 3 * 20

    println(f"${(hour - 1) % 12 + 1}%02d:$minute%02d:$second%02d ${if (hour < 12) "AM" else "PM"}")
  }
}
