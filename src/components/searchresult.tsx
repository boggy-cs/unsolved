import { Row, Col, Container, Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import { useRecoilValue, useRecoilState, SetterOrUpdater } from "recoil";
import { memberState, amountBronzeState, amountSilverState, amountGoldState, amountPlatinumState, amountDiamondState, amountRubyState, searchTagState, sortOptionState, directionOptionState, bronzeElementState, silverElementState, goldElementState, platinumElementState, diamondElementState, rubyElementState } from "../atoms";
import { SolvedacApi, ProblemDto, LevelType, Level } from "./solvedac";

export function SearchResult() {
    const solvedacApi = new SolvedacApi();

    // member
    const member = useRecoilValue(memberState);

    // amount by level
    const amountBronze = useRecoilValue(amountBronzeState);
    const amountSilver = useRecoilValue(amountSilverState);
    const amountGold = useRecoilValue(amountGoldState);
    const amountPlatinum = useRecoilValue(amountPlatinumState);
    const amountDiamond = useRecoilValue(amountDiamondState);
    const amountRuby = useRecoilValue(amountRubyState);

    // search option
    const searchTag = useRecoilValue(searchTagState);
    const sortOption = useRecoilValue(sortOptionState);
    const directionOption = useRecoilValue(directionOptionState);

    const [bronzeElement, setBronzeElement] = useRecoilState(bronzeElementState);
    const [silverElement, setSilverElement] = useRecoilState(silverElementState);
    const [goldElement, setGoldElement] = useRecoilState(goldElementState);
    const [platinumElement, setPlatinumElement] = useRecoilState(platinumElementState);
    const [diamondElement, setDiamondElement] = useRecoilState(diamondElementState);
    const [rubyElement, setRubyElement] = useRecoilState(rubyElementState);

    const problemToComponent = (problem: ProblemDto) => {
        return (
            <ListGroup.Item>
                <Row>
                    <Col>{problem.titleKo}</Col>
                    <Col>{problem.problemId}</Col>
                </Row>
            </ListGroup.Item>
        )
    }

    const updateSolvedProblem = async () => {
        const solved = await solvedacApi.searchSolvedProblemByGroup(member.split(" |\\n"));

        function update(level: LevelType, setter: SetterOrUpdater<JSX.Element[]>, amount: number) {
            if (amount > 0) {
                solvedacApi.searchUnsolvedProblemByLevel(
                    // TODO improve searchTag split option
                    solved, amount, level, level, searchTag.split(' '), directionOption, sortOption).then((problems) => {
                        const result: JSX.Element[] = [];
                        problems.forEach((problem) => result.push(problemToComponent(problem)));
                        setter(result);
                    });
            }
        }

        update(Level.Bronze, setBronzeElement, amountBronze);
        update(Level.Silver, setSilverElement, amountSilver);
        update(Level.Gold, setGoldElement, amountGold);
        update(Level.Platinum, setPlatinumElement, amountPlatinum);
        update(Level.Diamond, setDiamondElement, amountDiamond);
        update(Level.Ruby, setRubyElement, amountRuby);
    }


    return (
        <Container>
            <Button className='m-2' onClick={updateSolvedProblem}>문제 검색</Button>
            <Row xs={1} md={2} lg={2} className={'g-4'}>
                <Col>
                    <Card>
                        <Card.Header
                            style={{ color: 'rgb(160, 90, 31)', fontWeight: 'bold' }} >
                            브론즈
                        </Card.Header>
                        <ListGroup>
                            {bronzeElement}
                        </ListGroup>

                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header style={{ color: 'rgb(119, 134, 154)', fontWeight: 'bold' }}>
                            실버
                        </Card.Header>
                        <ListGroup>
                            {silverElement}
                        </ListGroup>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Header style={{ color: 'rgb(223, 157, 55)', fontWeight: 'bold' }}>
                            골드
                        </Card.Header>
                        <ListGroup>
                            {goldElement}
                        </ListGroup>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Header style={{ color: 'rgb(39, 226, 164)', fontWeight: 'bold' }}>
                            플래티넘
                        </Card.Header>
                        <ListGroup>
                            {platinumElement}
                        </ListGroup>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Header style={{ color: 'rgb(107, 188, 247)', fontWeight: 'bold' }}>
                            다이아
                        </Card.Header>
                        <ListGroup>
                            {diamondElement}
                        </ListGroup>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Card.Header style={{ color: 'rgb(231, 52, 100)', fontWeight: 'bold' }}>
                            루비
                        </Card.Header>
                        <ListGroup>
                            {rubyElement}
                        </ListGroup>
                    </Card>
                </Col>

            </Row>

        </Container>
    )
}