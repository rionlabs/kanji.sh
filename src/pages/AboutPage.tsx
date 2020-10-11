import React from "react";
import {Typography} from "@material-ui/core";
import Page from "./base/Page";

export default function AboutPage() {
    return (
        <Page>
            <Typography variant={"h3"} gutterBottom>
                About
            </Typography>

            <Typography variant={"h4"} gutterBottom>
                How can you help?
            </Typography>

            <Typography variant={"h4"} gutterBottom>
                Acknowledgments
            </Typography>
            <Typography gutterBottom variant="h5">
                KanjiVG
            </Typography>
            <Typography gutterBottom variant="body1">
                Kanji stroke diagrams are based on data from <a
                href={"http://kanjivg.tagaini.net/"}>KanjiVG</a>, which is copyright © 2009-2012 Ulrich Apel
                and released under the <a href={"https://creativecommons.org/licenses/by-sa/3.0/"}>Creative
                Commons Attribution-Share Alike 3.0</a> license.
            </Typography>

            <Typography gutterBottom variant="h5">
                Sources
            </Typography>
            <Typography gutterBottom variant="body1">
                JLPT kanji data comes from Peter van der Woude's <a
                href={"https://jlptstudy.net"}>JLPTStudy</a> study site.
                Grades & frequency kanji data is taken from <a
                href={"https://en.wikipedia.org/wiki/Kyōiku_kanji"}>Wikipedia</a> page.
                Wanikani level data comes from <a href={"https://docs.api.wanikani.com/"}>Wanikani API</a>.
                Meanings & Readings data is copied from David Gouveia's <a
                href={"https://github.com/davidluzgouveia/kanji-data"}>GitHub</a> project.
            </Typography>

            <Typography gutterBottom variant="h5">
                Development
            </Typography>
            <Typography gutterBottom variant="body1">
                Kanji.sh is open source! Check out the <a
                href="https://github.com/aruke/kanji.sh">GitHub page</a> to see the source code, build
                it yourself, file an <a href="https://github.com/aruke/kanji.sh/issues">issue</a>, and
                make it better!
                Show your love by sharing this website and starring the <a
                href="https://github.com/aruke/kanji.sh">GitHub repository</a>!
            </Typography>
        </Page>
    );
}
